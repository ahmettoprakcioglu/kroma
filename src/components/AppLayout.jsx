import { MAIN_CONTENT_TITLE } from '../constants/text';
import ButtonContainer from './ButtonContainer';
import Header from './Header';
import styled from 'styled-components';
import ImageUpload from './ImageUpload';
import { useRef, useState } from 'react';
import ImagePreview from './ImagePreview';
import ImageActionButtons from './ImageActionButtons';

const Main = styled.main`
  flex: 1;
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

const StyledAppLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 3.2rem;
  height: 100%;

  background-color: var(--color-grey-50);
  background-image: radial-gradient(var(--white) 2px, transparent 2px);
  background-size: 20px 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex: 1;
  margin: 16px;
`;

const ContentTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: var(--black);
`;

const AppLayout = () => {
  const canvasRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [filteredImage, setFilteredImage] = useState(null);
  console.log('selectedImage: ', selectedImage);

  return (
    <StyledAppLayout>
      <Header />
      <Main>
        <Container>
          <MainContent>
            <ContentTitle>{MAIN_CONTENT_TITLE}</ContentTitle>
            <ButtonContainer
              originalImage={selectedImage}
              setFilteredImage={setFilteredImage}
              canvasRef={canvasRef}
            />
            {selectedImage ? (
              <ImagePreview
                originalImage={selectedImage}
                filteredImage={filteredImage} 
                canvasRef={canvasRef}
              />
            ) : <ImageUpload setSelectedImage={setSelectedImage} />}
            {selectedImage && <ImageActionButtons setSelectedImage={setSelectedImage} setFilteredImage={setFilteredImage} />}
          </MainContent>
        </Container>
      </Main>
    </StyledAppLayout>
  );
};

export default AppLayout;