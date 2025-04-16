import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(to bottom, #7eb6e9, #5fb2ef);
  border-radius: 12px 12px 0 0;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 20px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const CreateButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  padding: 6px 12px;
  color: white;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }
`;

const Header = ({ onCreateNote }) => {
  return (
    <HeaderContainer>
      <HeaderTitle>技术博客</HeaderTitle>
      {onCreateNote && (
        <CreateButton onClick={onCreateNote}>
          创建笔记
        </CreateButton>
      )}
    </HeaderContainer>
  );
};

export default Header;