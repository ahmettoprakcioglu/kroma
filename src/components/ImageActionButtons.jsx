import styled, { css } from 'styled-components';
import StyledButton from './Button';
import { func, string } from 'prop-types';
import { downloadAll } from '../utils';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Download, Reset, TrashCan, Save } from '@carbon/icons-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import supabase from '../config/supabase';
import toast from 'react-hot-toast';

const ActionButtonsWrapper = styled.div`
  ${props => props.isSmallDevice && css`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    width: 100%;
  `};

  ${props => !props.isSmallDevice && css`
    display: flex;
    align-items: center;
    gap: 16px;
  `};
`;

ActionButtonsWrapper.defaultProps = {
  isSmallDevice: false
};

const ImageActionButtons = ({
  originalImage,
  setSelectedImage,
  setFilteredImage
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const isSmallDevice = useMediaQuery('only screen and (max-width : 832px)');

  const handleSave = async () => {
    if (!user) {
      toast.error('Please sign in to save images');
      return;
    }

    try {
      setIsLoading(true);
      
      // Convert base64 to blob
      const response = await fetch(originalImage);
      const blob = await response.blob();
      
      // Upload to Supabase Storage with correct path structure
      const timestamp = Date.now();
      const fileName = `${user.id}/${timestamp}.png`;
      const { error: uploadError } = await supabase.storage
        .from('user-images')
        .upload(fileName, blob);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-images')
        .getPublicUrl(fileName);

      // Save to database
      const { error: dbError } = await supabase
        .from('saved_images')
        .insert([
          {
            user_id: user.id,
            image_url: publicUrl,
            file_name: fileName,
            created_at: new Date().toISOString()
          }
        ]);

      if (dbError) throw dbError;

      toast.success('Image saved successfully');
    } catch (error) {
      console.error('Error saving image:', error);
      toast.error('Failed to save image');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ActionButtonsWrapper isSmallDevice={isSmallDevice}>
      <StyledButton
        onClick={() => downloadAll(originalImage, setIsLoading)}
        StartIcon={Download}
        isLoading={isLoading}
        loaderText='Downloading'
      >
        Download
      </StyledButton>
      {user && (
        <StyledButton
          onClick={handleSave}
          StartIcon={Save}
          isLoading={isLoading}
          loaderText='Saving'
        >
          Save
        </StyledButton>
      )}
      <StyledButton
        StartIcon={Reset}
        disabled={isLoading}
        onClick={() => {
          setFilteredImage(null);
        }}
      >
        Reset
      </StyledButton>
      <StyledButton
        StartIcon={TrashCan}
        disabled={isLoading}
        onClick={() => {
          setSelectedImage(null);
          setFilteredImage(null);
        }}
        style={{ gridColumnStart: 1, gridColumnEnd: -1 }}
      >
        Remove
      </StyledButton>
    </ActionButtonsWrapper>
  );
};

export default ImageActionButtons;

ImageActionButtons.propTypes = {
  originalImage: string,
  setSelectedImage: func,
  setFilteredImage: func
};

ImageActionButtons.defaultProps = {
  originalImage: '',
  setSelectedImage: f => f,
  setFilteredImage: f => f
};
