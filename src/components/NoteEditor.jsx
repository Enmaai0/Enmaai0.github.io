import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditorContainer = styled.div`
  margin-top: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: var(--text-color);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: var(--border-radius);
  border: 1px solid #b5b5b5;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 120, 215, 0.2), inset 0 1px 3px rgba(0, 0, 0, 0.1);
  }
`;

const EditorWrapper = styled.div`
  position: relative;
  
  textarea {
    width: 100%;
    min-height: 300px;
    padding: 10px;
    border-radius: var(--border-radius);
    border: 1px solid #b5b5b5;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.5;
    resize: vertical;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(0, 120, 215, 0.2), inset 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }
`;

const ToolbarWrapper = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  flex-wrap: wrap;
  background: linear-gradient(to bottom, #f0f0f0, #e1e1e1);
  padding: 5px;
  border-radius: var(--border-radius);
  border: 1px solid #b5b5b5;
`;

const ToolbarButton = styled.button`
  background: linear-gradient(to bottom, #ffffff, #f0f0f0);
  border: 1px solid #b5b5b5;
  border-radius: 3px;
  padding: 5px 8px;
  font-size: 12px;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: linear-gradient(to bottom, #e9e9e9, #d5d5d5);
    border-color: #999999;
  }
  
  &:active {
    background: linear-gradient(to bottom, #d5d5d5, #e9e9e9);
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  }
`;


const Button = styled.button`
  background: linear-gradient(to bottom, #7eb6e9, #5fb2ef);
  color: white;
  border: 1px solid #4a90e2;
  border-radius: var(--border-radius);
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(to bottom, #5fb2ef, #4cc265);
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.25);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

const EditorForm = styled.form`
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: #e53935;
  margin-bottom: 10px;
  font-size: 14px;
`;

const SaveButton = styled(Button)`
  background: linear-gradient(to bottom, #7eb6e9, #5fb2ef);
`;

const CancelButton = styled(Button)`
  background: linear-gradient(to bottom, #f0f0f0, #e1e1e1);
  color: var(--text-color);
  border: 1px solid #b5b5b5;
`;

const NoteEditor = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
    } else {
      setTitle('');
      setContent('');
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('请输入标题');
      return;
    }
    
    if (!content.trim()) {
      setError('请输入内容');
      return;
    }
    
    const noteData = {
      ...(note || {}),
      title: title.trim(),
      content: content.trim()
    };
    
    onSave(noteData);
  };

  return (
    <EditorContainer>
      <EditorForm onSubmit={handleSubmit}>
        <FormGroup>
          <Label>标题</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="输入笔记标题..."
          />
        </FormGroup>
        
        <FormGroup>
          <Label>内容</Label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="输入笔记内容..."
            modules={{
              toolbar: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['link', 'image', 'code-block'],
                ['clean']
              ]
            }}
          />
        </FormGroup>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <ButtonGroup>
          <SaveButton type="submit">
            {note ? '更新笔记' : '保存笔记'}
          </SaveButton>
          <CancelButton type="button" onClick={onCancel}>
            取消
          </CancelButton>
        </ButtonGroup>
      </EditorForm>
    </EditorContainer>
  );
};

export default NoteEditor;