import { ChevronDown } from '@carbon/icons-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BUTTONS } from '../constants/buttons';
import { func, string } from 'prop-types';

const DropdownWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const StyledDropdownButton = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 24px;
  border-radius: var(--border-radius-sm);
  border: solid 1px var(--black-two);
  background-color: var(--light-sage);
  cursor: pointer;
`;

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* flex-wrap: wrap; */
  gap: 16px;
  position: absolute;
  min-width: 100%;
  max-height: 300px;
  overflow-x: auto;
  z-index: 10;
  scroll-behavior: smooth;
  padding: 20px 24px;
  top: 53px;
  border-radius: var(--border-radius-sm);
  border: solid 1px var(--black-two);
  background-color: var(--light-sage);
  padding-block-start: 215px;
`;

const DropdownContentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #ebebeb;
  width: 100%;
  padding-bottom: 15px;
  cursor: pointer;

  &:last-child {
    border: none;
  }
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const Icon = styled(ChevronDown)`
  fill: var(--black-two);
`;

const Dropdown = ({
  applyFilter,
  originalImage
}) => {
  const [isOpen, setIsOpen] = useState();
  const [selectedOption, setOption] = useState('Default');
  const dropdownOptions = ['Default', ...BUTTONS.map(({ text }) => text)];

  useEffect(() => {
    if (selectedOption && originalImage) {
      applyFilter(selectedOption);
    }
  }, [selectedOption]);

  return (
    <DropdownWrapper>
      <StyledDropdownButton onClick={() => setIsOpen(curr => !curr)}>
        <Text>{selectedOption}</Text>
        <Icon size='24' />
      </StyledDropdownButton>
      {isOpen && (
        <DropdownContent>
          {dropdownOptions.map((option, index) => {
            return (
              <DropdownContentItem key={index} onClick={() => {
                setOption(option);
                setIsOpen(false);
              }}>
                {option}
              </DropdownContentItem>
            );
          })}
        </DropdownContent>
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;

Dropdown.propTypes = {
  applyFilter: func,
  originalImage: string
};

Dropdown.defaultProps = {
  applyFilter: f => f,
  originalImage: ''
};
