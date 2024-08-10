import styled from 'styled-components';
import StyledButton from './Button';
import { func } from 'prop-types';

const ActionButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ImageActionButtons = ({
  setSelectedImage,
  setFilteredImage
}) => {

  return (
    <ActionButtonsWrapper>
      <StyledButton>Download</StyledButton>
      <StyledButton
        onClick={() => {
          setSelectedImage(null);
          setFilteredImage(null);
        }}
      >
        Reset
      </StyledButton>
      <StyledButton
        onClick={() => {
          setFilteredImage(null);
        }}
      >
        Default
      </StyledButton>
    </ActionButtonsWrapper>
  );
};

export default ImageActionButtons;

ImageActionButtons.propTypes = {
  setSelectedImage: func,
  setFilteredImage: func
};

ImageActionButtons.defaultProps = {
  setSelectedImage: f => f,
  setFilteredImage: f => f
};
