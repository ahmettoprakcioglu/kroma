import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import supabase from '../config/supabase';
import StyledButton from './Button';
import { Download, TrashCan } from '@carbon/icons-react';
import toast from 'react-hot-toast';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background-color: var(--off-white);
  border-radius: var(--border-radius-lg);
  border: solid 1px var(--warm-grey);
`;

const Title = styled.h2`
  color: var(--black-two);
  font-size: 1.25rem;
  margin-bottom: 1rem;
`;

const ImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: var(--border-radius-md);
  overflow: hidden;
  background-color: var(--white-two);
  border: 1px solid var(--warm-grey);
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ImageActions = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;

  ${ImageCard}:hover & {
    opacity: 1;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  color: var(--greyish-brown);
  padding: 2rem;
`;

const SavedImages = () => {
  const { user } = useAuth();
  const [savedImages, setSavedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchSavedImages();
    }
  }, [user]);

  const fetchSavedImages = async () => {
    try {
      const { data, error } = await supabase
        .from('saved_images')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSavedImages(data || []);
    } catch (error) {
      console.error('Error fetching saved images:', error);
      toast.error('Failed to load saved images');
    }
  };

  const handleDelete = async (imageId, fileName) => {
    try {
      setIsLoading(true);
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('user-images')
        .remove([fileName]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('saved_images')
        .delete()
        .eq('id', imageId);

      if (dbError) throw dbError;
      
      setSavedImages(prev => prev.filter(img => img.id !== imageId));
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (imageUrl) => {
    try {
      setIsLoading(true);
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const fileName = imageUrl.split('/').pop() || 'downloaded-image.png';
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Image downloaded successfully');
    } catch (error) {
      console.error('Error downloading image:', error);
      toast.error('Failed to download image');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Container>
      <Title>Saved Images</Title>
      {savedImages.length === 0 ? (
        <EmptyState>
          <p>No saved images yet</p>
          <p>Upload and save images to see them here</p>
        </EmptyState>
      ) : (
        <ImageGrid>
          {savedImages.map((image) => (
            <ImageCard key={image.id}>
              <Image src={image.image_url} alt="Saved image" />
              <ImageActions>
                <StyledButton
                  StartIcon={Download}
                  size="small"
                  onClick={() => handleDownload(image.image_url)}
                  isLoading={isLoading}
                >
                  Download
                </StyledButton>
                <StyledButton
                  StartIcon={TrashCan}
                  size="small"
                  variant="primary"
                  onClick={() => handleDelete(image.id, image.file_name)}
                  disabled={isLoading}
                >
                  Delete
                </StyledButton>
              </ImageActions>
            </ImageCard>
          ))}
        </ImageGrid>
      )}
    </Container>
  );
};

export default SavedImages; 