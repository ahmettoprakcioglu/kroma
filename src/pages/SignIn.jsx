import styled from 'styled-components';
import AuthForm from '../components/auth/AuthForm';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <Container>
      <AuthForm type="signin" />
      <StyledText>
        Don&apos;t have an account? <StyledLink to="/signup">Sign Up</StyledLink>
      </StyledText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: var(--off-white-two);
`;

const StyledText = styled.p`
  margin-top: 1rem;
  color: var(--greyish-brown);
  font-size: 0.875rem;
`;

const StyledLink = styled(Link)`
  color: var(--black-two);
  text-decoration: none;
  font-weight: 600;
  
  &:hover {
    text-decoration: underline;
  }
`;

export default SignIn; 