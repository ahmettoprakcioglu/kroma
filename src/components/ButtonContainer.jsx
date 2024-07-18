import styled from 'styled-components';
import { BUTTONS } from '../constants/buttons';
import StyledButton from './Button';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  max-width: 100%;
  overflow-y: auto;
`;

const ButtonContainer = () => {
  return (
    <Container>
      {BUTTONS.map(({ text, id, variant }) => {
        return (
          <StyledButton
            key={id}
            variant={variant}
          >
            {text}
          </StyledButton>
        );
      })}
    </Container>
  );
};

export default ButtonContainer;