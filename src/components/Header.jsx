import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import StyledButton from './Button';
import { Logout } from '@carbon/icons-react';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
    padding: 32px 30px;
    background-color: var(--off-white);
    border-bottom: 1px solid var(--greyish);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LogoLink = styled(Link)`
    color: var(--black-two);
    font-weight: 600;
    font-size: 1.25rem;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #000;
    }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserEmail = styled.span`
  color: var(--greyish-brown);
  font-size: 0.875rem;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <StyledHeader>
      <LogoLink to="/">Kroma</LogoLink>
      {user ? (
        <UserSection>
          <UserEmail>{user.email}</UserEmail>
          <StyledButton 
            variant="secondary" 
            onClick={signOut}
            StartIcon={Logout}
            size="medium"
          >
            Sign Out
          </StyledButton>
        </UserSection>
      ) : (
        <UserSection>
          <StyledLink to="/signin">
            <StyledButton variant="secondary" size="medium">
              Sign In
            </StyledButton>
          </StyledLink>
          <StyledLink to="/signup">
            <StyledButton variant="primary" size="medium">
              Sign Up
            </StyledButton>
          </StyledLink>
        </UserSection>
      )}
    </StyledHeader>
  );
};
  
export default Header;
