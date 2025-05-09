import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import StyledButton from './Button';
import { Logout } from '@carbon/icons-react';

const StyledHeader = styled.header`
    padding: 32px 30px;
    background-color: var(--off-white);
    border-bottom: 1px solid var(--greyish);
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledLogo = styled.div`
    max-width: 192px;
    color: var(--black-two);
    font-weight: 600;
    font-size: 1.25rem;
`;

const HeaderTitle = styled.span`
  flex-grow: 0;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: right;
  color: var(--black-two);
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

const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <StyledHeader>
      <StyledLogo>Kroma</StyledLogo>
      <HeaderTitle>Create visible interfaces for everyone</HeaderTitle>
      {user && (
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
      )}
    </StyledHeader>
  );
};
  
export default Header;
