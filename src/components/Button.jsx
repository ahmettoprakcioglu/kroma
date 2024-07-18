import { node, string } from 'prop-types';
import styled, { css } from 'styled-components';

const variant = {
  primary: css`
    background-color: var(--black-two);
    font-size: 20px;
    color: var(--light-sage);
    border: none;
  `,
  secondary: css`
    border: solid 1px var(--black-two);
    background-color: var(--light-sage);
    color: var(--black-two);
    font-size: 16px;
  `
};

const size = {
  medium: css`
    width: 150px;
    height: 45px;
    padding: 12px 8px;
  `,
  large: css`
    width: 318px;
    height: 62px;
    padding: 16px;
  `
};

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 0;
  font-weight: 500;
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  ${props => variant[props.variant]}
  ${props => size[props.size]}
`;

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const StyledButton = props => {
  const { children, StartIcon, ...rest } = props;
  return (
    <Button type='button' {...rest}>
      {StartIcon ? (
        <ButtonContent>
          <StartIcon size="30px" />
          {children}
        </ButtonContent>
      ) : children}
    </Button>
  );
};

export default StyledButton;

StyledButton.propTypes = {
  variant: string,
  size: string,
  StartIcon: node,
  children: node
};

StyledButton.defaultProps = {
  variant: 'primary',
  size: 'medium',
  StartIcon: null,
  children: <></>
};
