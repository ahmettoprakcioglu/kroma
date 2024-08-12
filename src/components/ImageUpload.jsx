import { func } from 'prop-types';
import { useRef } from 'react';
import styled from 'styled-components';

import { CloudUpload } from '@carbon/icons-react';
import toast from 'react-hot-toast';

import { IMAGE_UPLOAD_DESC, MAX_UPLOAD_SIZE, SUPPORTED_IMAGE_FORMAT, UPLOAD, UPLOAD_FROM_COMPUTER } from '../constants/text';
import StyledButton from './Button';
import { useMediaQuery } from '@uidotdev/usehooks';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
  padding: 13px;
  border-radius: var(--border-radius-lg);
  border: solid 1px var(--warm-grey);
  background-color: var(--off-white);
`;

const ImageUploadDesc = styled.p`
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: var(--black-two);
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: normal;
  text-align: center;
  color: var(--greyish-brown);
`;

const ImageUpload = ({
  setSelectedImage
}) => {
  const fileInputRef = useRef();
  const isSmallDevice = useMediaQuery('only screen and (max-width : 832px)');

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    const MAX_SIZE_MB = 10;

    if (file && ALLOWED_TYPES.includes(file.type)) {
      const fileSizeMB = file.size / 1024 / 1024;
      if (fileSizeMB <= MAX_SIZE_MB) {
        const reader = new FileReader();

        reader.onload = ({ target: { result } }) => {
          setSelectedImage(result);
        };

        reader.readAsDataURL(file);
      } else {
        toast.error(`File size (${fileSizeMB.toFixed(2)} MB) exceeds the maximum allowed size of ${MAX_SIZE_MB} MB.`);
        fileInputRef.current.value = '';
      }
    } else {
      toast.error(`File (${file?.type || 'undefined'}) not supported.`);
      fileInputRef.current.value = '';
    }
  };

  return (
    <Container>
      <ImageUploadDesc>{IMAGE_UPLOAD_DESC}</ImageUploadDesc>
      <StyledButton
        StartIcon={CloudUpload}
        size='large'
        onClick={openFileDialog}
      >
        {isSmallDevice ? UPLOAD: UPLOAD_FROM_COMPUTER}
      </StyledButton>
      <input
        type="file"
        accept="image/png, image/jpeg, image/jpg', image/svg+xml"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <TextContainer>
        <p>{SUPPORTED_IMAGE_FORMAT}</p>
        <p>{MAX_UPLOAD_SIZE}</p>
      </TextContainer>
    </Container>
  );
};

export default ImageUpload;

ImageUpload.propTypes = {
  setSelectedImage: func
};

ImageUpload.defaultProps = {
  setSelectedImage: f => f
};