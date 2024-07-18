import styled from 'styled-components';

const StyledHeader = styled.header`
    padding: 32px 30px;
    background-color: var(--off-white);
    border-bottom: 1px solid var(--greyish);
    display: flex;
    justify-content: space-between;
`;

const StyledLogo = styled.div`
    max-width: 192px;
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

const Header = () => {
  return (
    <StyledHeader>
      <StyledLogo>Logo</StyledLogo>
      <HeaderTitle>Create visible interfaces for everyone</HeaderTitle>
    </StyledHeader>
  );
};
  
export default Header;
