import styled from 'styled-components';
import { useAuth } from '../context/AuthContext';
import StyledButton from './Button';
import { Link, useLocation } from 'react-router-dom';
import { Image, ChevronDown } from '@carbon/icons-react';
import { useState, useRef, useEffect } from 'react';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;
  background-color: var(--white);
  border-bottom: 1px solid var(--warm-grey);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--black-two);
  text-decoration: none;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SavedImagesLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--black-two);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  svg {
    fill: var(--black-two);
    transition: all 0.2s ease;
  }

  &:hover {
    background-color: var(--white);
    border-color: var(--warm-grey);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    svg {
      fill: var(--black);
    }
  }

  &.active {
    background-color: var(--white);
    border-color: var(--warm-grey);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

    svg {
      fill: var(--black);
    }
  }
`;

const UserSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AvatarButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--warm-grey);
  background-color: var(--white);
  cursor: pointer;
  border-radius: 2rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--off-white);
    transform: translateY(-1px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--white);
  background-color: ${props => props.backgroundColor || '#6366f1'};
  border: 2px solid var(--white);
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: var(--white);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--warm-grey);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 200px;
  z-index: 100;
`;

const UserInfo = styled.div`
  padding: 1rem;
  border-bottom: 1px solid var(--warm-grey);
`;

const UserName = styled.div`
  font-weight: 500;
  color: var(--black-two);
`;

const UserEmail = styled.div`
  font-size: 0.875rem;
  color: var(--greyish-brown);
`;

const DropdownItem = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  border: none;
  background: none;
  color: var(--black-two);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--off-white);
  }
`;

const Header = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isOnSavedImages = location.pathname === '/saved-images';

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getRandomColor = (text) => {
    const colors = [
      '#6366f1', '#8b5cf6', '#d946ef',
      '#ec4899', '#f43f5e', '#f97316',
      '#84cc16', '#22c55e', '#14b8a6'
    ];
    const index = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <StyledHeader>
      <Logo to="/">Kroma</Logo>
      <Nav>
        {user && (
          <SavedImagesLink 
            to="/saved-images"
            className={isOnSavedImages ? 'active' : ''}
          >
            <Image size={20} />
            Saved Images
          </SavedImagesLink>
        )}
        {user ? (
          <UserSection ref={dropdownRef}>
            <AvatarButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <Avatar backgroundColor={getRandomColor(user.email)}>
                {user.user_metadata?.avatar_url ? (
                  <AvatarImage src={user.user_metadata.avatar_url} alt="User avatar" />
                ) : (
                  getInitials(user.user_metadata?.full_name || user.email)
                )}
              </Avatar>
              <ChevronDown size={16} style={{ color: 'var(--greyish-brown)' }} />
            </AvatarButton>
            {isDropdownOpen && (
              <DropdownMenu>
                <UserInfo>
                  <UserName>{user.user_metadata?.full_name || 'User'}</UserName>
                  <UserEmail>{user.email}</UserEmail>
                </UserInfo>
                <DropdownItem onClick={signOut}>
                  Sign Out
                </DropdownItem>
              </DropdownMenu>
            )}
          </UserSection>
        ) : (
          <Link to="/signin">
            <StyledButton>
              Sign In
            </StyledButton>
          </Link>
        )}
      </Nav>
    </StyledHeader>
  );
};

export default Header;
