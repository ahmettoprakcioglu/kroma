import styled from 'styled-components';
import StyledButton from './Button';
import { func, string } from 'prop-types';
import { downloadAll } from '../utils';

const ActionButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ImageActionButtons = ({
  originalImage,
  setSelectedImage,
  setFilteredImage
}) => {

  return (
    <ActionButtonsWrapper>
      <StyledButton
        onClick={() => downloadAll(originalImage)}
      >
        Download
      </StyledButton>
      <StyledButton
        onClick={() => {
          setFilteredImage(null);
        }}
      >
        Reset
      </StyledButton>
      <StyledButton
        onClick={() => {
          setSelectedImage(null);
          setFilteredImage(null);
        }}
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
