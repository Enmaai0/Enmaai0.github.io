import { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const NotesContainer = styled.div`
  margin-top: 20px;
`;

const NoteItem = styled.div`
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: var(--border-radius);
  padding: 15px;
  margin-bottom: 15px;
  transition: all 0.2s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
`;

const NoteTitle = styled.h3`
  margin: 0 0 10px 0;
  color: var(--primary-color);
  font-size: 18px;
`;

const NoteDate = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 10px;
`;

const NotePreview = styled.div`
  margin: 0;
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  
  img {
    max-width: 100%;
    max-height: 150px;
    object-fit: contain;
  }
  
  pre {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    padding: 8px;
    overflow: auto;
  }
  
  blockquote {
    border-left: 3px solid #b5b5b5;
    margin-left: 0;
    padding-left: 10px;
    color: #666;
  }
  
  code {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 3px;
    padding: 2px 4px;
    font-family: monospace;
  }
`;

const NoteActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: linear-gradient(to bottom, #f0f0f0, #e1e1e1);
  border: 1px solid #b5b5b5;
  border-radius: var(--border-radius);
  padding: 5px 10px;
  font-size: 12px;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(to bottom, #e9e9e9, #d5d5d5);
    border-color: #999999;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  &.edit {
    background: linear-gradient(to bottom, #7eb6e9, #5fb2ef);
    color: white;
    border-color: rgba(255, 255, 255, 0.8);
    
    &:hover {
      background: linear-gradient(to bottom, #5fb2ef, #4cc265);
    }
  }
  
  &.delete {
    background: linear-gradient(to bottom, #f0a0a0, #e57373);
    color: white;
    border-color: rgba(255, 255, 255, 0.8);
    
    &:hover {
      background: linear-gradient(to bottom, #e57373, #ef5350);
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 30px;
  color: #666;
  font-style: italic;
`;

const NotesList = ({ notes, onEdit, onDelete }) => {
  const navigate = useNavigate(); // 添加导航钩子
  
  // 处理编辑操作
  const handleEdit = (note) => {
    if (onEdit) {
      onEdit(note);
    } else {
      // 如果没有提供onEdit函数，使用导航方式
      navigate(`/edit/${note.id}`);
    }
  };
  
  // 处理删除操作，添加确认提示
  const handleDelete = (id) => {
    if (window.confirm('确定要删除这条笔记吗？')) {
      onDelete(id);
    }
  };

  if (!notes || notes.length === 0) {
    return (
      <EmptyState>暂无笔记，点击"创建笔记"按钮开始记录吧！</EmptyState>
    );
  }

  return (
    <NotesContainer>
      {notes.map(note => (
        <NoteItem key={note.id}>
          <NoteTitle>{note.title}</NoteTitle>
          <NoteDate>{new Date(note.date).toLocaleString('zh-CN')}</NoteDate>
          <NotePreview dangerouslySetInnerHTML={{ __html: note.content }} />
          <NoteActions>
            <ActionButton 
              className="edit" 
              onClick={(e) => {
                e.preventDefault(); // 阻止默认行为
                handleEdit(note);
              }}
            >
              编辑
            </ActionButton>
            <ActionButton 
              className="delete" 
              onClick={(e) => {
                e.preventDefault(); // 阻止默认行为
                handleDelete(note.id);
              }}
            >
              删除
            </ActionButton>
          </NoteActions>
        </NoteItem>
      ))}
    </NotesContainer>
  );
};

export default NotesList;