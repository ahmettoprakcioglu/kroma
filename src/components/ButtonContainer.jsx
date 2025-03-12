import styled, { css } from 'styled-components';
import { 
  BUTTONS, 
  PROTANOMALY, 
  DEUTERANOMALY, 
  TRITANOMALY, 
  PROTANOPIA, 
  DEUTERANOPIA,
  TRITANOPIA,
  ACHROMATOPSIA,
  BLUE_CONE_MONOCHROMACY
} from '../constants/buttons';
import StyledButton from './Button';
import { func, object, string } from 'prop-types';
import { applyFilterToCtx } from '../utils';
import { useMediaQuery } from '@uidotdev/usehooks';
import Dropdown from './Dropdown';
import { useState } from 'react';

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
  const [selectedFilter, setSelectedFilter] = useState('');

  const getFilterConstant = (filterName) => {
    if (filterName === 'Protanomaly') {
      return PROTANOMALY;
    } else if (filterName === 'Deuteranomaly') {
      return DEUTERANOMALY;
    } else if (filterName === 'Tritanomaly') {
      return TRITANOMALY;
    } else if (filterName === 'Protanopia') {
      return PROTANOPIA;
    } else if (filterName === 'Deuteranopia') {
      return DEUTERANOPIA;
    } else if (filterName === 'Tritanopia') {
      return TRITANOPIA;
    } else if (filterName === 'Achromatopsia') {
      return ACHROMATOPSIA;
    } else if (filterName === 'Blue Cone Monochromacy') {
      return BLUE_CONE_MONOCHROMACY;
    } else {
      // Default
      return filterName;
    }
  };

  const applyFilter = (filter) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
  
    if (!canvas || !ctx) {
      console.error('Canvas or context not found.');
      return;
    }
  
    const img = new Image();
    img.src = originalImage;
  
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      const filterConstant = getFilterConstant(filter);
      applyFilterToCtx(ctx, filterConstant);
  
      const filteredDataUrl = canvas.toDataURL();
      setFilteredImage(filteredDataUrl);
    };
  
    img.onerror = (error) => {
      console.error('Error loading image:', error);
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
              isSelected={selectedFilter === text}
              disabled={!originalImage}
              onClick={() => {
                if (originalImage) {
                  applyFilter(text);
                  setSelectedFilter(text);
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