import styled from 'styled-components';
import { IMAGE_UPLOAD_DESC, MAX_UPLOAD_SIZE, SUPPORTED_IMAGE_FORMAT, UPLOAD_FROM_COMPUTER } from '../constants/text';
import { CloudUpload } from '@carbon/icons-react';
import StyledButton from './Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  justify-content: center;
  width: 100%;
  height: 100%;
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

const ImageUpload = () => {
  return (
    <Container>
      <ImageUploadDesc>{IMAGE_UPLOAD_DESC}</ImageUploadDesc>
      <StyledButton
        StartIcon={CloudUpload}
        size='large'
      >
        {UPLOAD_FROM_COMPUTER}
      </StyledButton>
      <TextContainer>
        <p>{SUPPORTED_IMAGE_FORMAT}</p>
        <p>{MAX_UPLOAD_SIZE}</p>
      </TextContainer>
    </Container>
  );
};

export default ImageUpload;
