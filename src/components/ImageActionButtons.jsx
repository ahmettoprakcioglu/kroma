import styled, { css } from 'styled-components';
import StyledButton from './Button';
import { func, string } from 'prop-types';
import { downloadAll } from '../utils';
import { useMediaQuery } from '@uidotdev/usehooks';
import { Download, Reset, TrashCan } from '@carbon/icons-react';

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
  const isSmallDevice = useMediaQuery('only screen and (max-width : 832px)');

  return (
    <ActionButtonsWrapper isSmallDevice={isSmallDevice}>
      <StyledButton
        onClick={() => downloadAll(originalImage)}
        StartIcon={Download}
      >
        Download
      </StyledButton>
      <StyledButton
        StartIcon={Reset}
        onClick={() => {
          setFilteredImage(null);
        }}
      >
        Reset
      </StyledButton>
      <StyledButton
        StartIcon={TrashCan}
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
