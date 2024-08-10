import { object, string } from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  width: 100%;
  height: 620px;
  border-radius: var(--border-radius-lg);
  border: solid 1px var(--warm-grey);
  background-color: var(--off-white);
`;

const StyledImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
`;

const ImagePreview = ({
  originalImage,
  filteredImage,
  canvasRef
}) => {

  return (
    <Container>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <StyledImage
        src={filteredImage ? filteredImage : originalImage}
        alt={filteredImage ? 'filtered image' : 'original image'}
      />
    </Container>
  );
};

export default ImagePreview;

ImagePreview.propTypes = {
  filteredImage: string,
  originalImage: string,
  canvasRef: object
};

ImagePreview.defaultProps = {
  filteredImage: '',
  originalImage: '',
  canvasRef: {}
};
