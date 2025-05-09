import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';
import StyledButton from '../Button';
import { Image } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (type === 'signin') {
        await signIn(email, password);
        navigate('/dashboard');
      } else {
        await signUp(email, password, confirmPassword);
        // For signup, we don't navigate immediately because user needs to verify email
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithGoogle();
      // Google sign in will automatically redirect after success
      // due to OAuth flow, but we can add navigation here as fallback
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <Title>{type === 'signin' ? 'Sign In' : 'Sign Up'}</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <InputGroup>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </InputGroup>
      {type === 'signup' && (
        <InputGroup>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </InputGroup>
      )}
      <ButtonGroup>
        <StyledButton type="submit" variant="primary" size="medium">
          {type === 'signin' ? 'Sign In' : 'Sign Up'}
        </StyledButton>
        <Divider>
          <DividerLine />
          <DividerText>or</DividerText>
          <DividerLine />
        </Divider>
        <StyledButton
          type="button"
          variant="secondary"
          size="medium"
          onClick={handleGoogleSignIn}
          StartIcon={Image}
        >
          Continue with Google
        </StyledButton>
      </ButtonGroup>
    </StyledForm>
  );
};

AuthForm.propTypes = {
  type: PropTypes.oneOf(['signin', 'signup']).isRequired,
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background-color: var(--off-white);
  border-radius: var(--border-radius-lg);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: var(--black-two);
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--greyish-brown);
  font-size: 0.875rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid var(--warm-grey);
  border-radius: var(--border-radius-md);
  background-color: var(--white-two);
  color: var(--black-two);
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--black-two);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0.5rem 0;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: var(--warm-grey);
`;

const DividerText = styled.span`
  color: var(--greyish-brown);
  font-size: 0.875rem;
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 0.875rem;
  text-align: center;
  padding: 0.5rem;
  background-color: #fef2f2;
  border-radius: var(--border-radius-md);
`;

export default AuthForm; 