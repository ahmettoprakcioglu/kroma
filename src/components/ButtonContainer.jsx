import styled from 'styled-components';
import { BUTTONS } from '../constants/buttons';
import StyledButton from './Button';
import { func, object, string } from 'prop-types';
import { applyFilterToCtx } from '../utils';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  max-width: 100%;
  overflow-y: auto;
`;

const ButtonContainer = ({
  originalImage,
  setFilteredImage,
  canvasRef
}) => {

  const applyFilter = (filter) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = originalImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      applyFilterToCtx(ctx, filter);
      const filteredDataUrl = canvas.toDataURL();
      setFilteredImage(filteredDataUrl);
    };
  };

  return (
    <Container>
      {BUTTONS.map(({ text, id, variant }) => {
        return (
          <StyledButton
            key={id}
            variant={variant}
            onClick={() => {
              if (originalImage) {
                applyFilter(text);
              }
            }}
          >
            {text}
          </StyledButton>
        );
      })}
    </Container>
  );
};

export default ButtonContainer;

ButtonContainer.propTypes = {
  originalImage: string,
  setFilteredImage: func,
  canvasRef: object
};

ButtonContainer.defaultProps = {
  originalImage: '',
  setFilteredImage: f => f,
  canvasRef: {}
};