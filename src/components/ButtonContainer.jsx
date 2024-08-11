import styled, { css } from 'styled-components';
import { BUTTONS } from '../constants/buttons';
import StyledButton from './Button';
import { func, object, string } from 'prop-types';
import { applyFilterToCtx } from '../utils';
import { useMediaQuery } from '@uidotdev/usehooks';
import Dropdown from './Dropdown';

const deviceSize = {
  default: css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  `,
  medium: css`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  `,
  small: css`
    display: none;
  `
};
const Container = styled.div`
  ${props => deviceSize[props.deviceSize]}
  max-width: 100%;
  width: 100%;
  overflow-y: auto;
`;

Container.defaultProps = {
  deviceSize: 'default'
};

const ButtonContainer = ({
  originalImage,
  filteredImage,
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

  const isSmallDevice = useMediaQuery('only screen and (max-width : 832px)');

  const isMediumDevice = useMediaQuery(
    'only screen and (min-width : 833px) and (max-width : 1475px)'
  );

  return (
    <>
      <Container deviceSize={isMediumDevice ? 'medium' : (isSmallDevice ? 'small' : 'default')}>
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
      {isSmallDevice && <Dropdown applyFilter={applyFilter} originalImage={originalImage} filteredImage={filteredImage} />}
    </>
  );
};

export default ButtonContainer;

ButtonContainer.propTypes = {
  originalImage: string,
  filteredImage: string,
  setFilteredImage: func,
  canvasRef: object
};

ButtonContainer.defaultProps = {
  originalImage: '',
  filteredImage: '',
  setFilteredImage: f => f,
  canvasRef: {}
};