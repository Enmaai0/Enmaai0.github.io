import { useState, useRef } from 'react';
import styled from 'styled-components';

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

const NoteEditor = ({ onSave, initialNote = { title: '', content: '' } }) => {
  const [note, setNote] = useState(initialNote);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 处理富文本编辑功能
  const handleFormat = (command, value = null) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = note.content.substring(start, end);
    let newText = '';
    
    switch(command) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'heading':
        newText = `## ${selectedText}`;
        break;
      case 'link':
        const url = prompt('请输入链接地址:', 'https://');
        if (url) newText = `[${selectedText}](${url})`;
        else return;
        break;
      case 'list':
        newText = selectedText.split('\n').map(line => `- ${line}`).join('\n');
        break;
      case 'code':
        newText = `\`${selectedText}\``;
        break;
      case 'codeblock':
        newText = `\`\`\`\n${selectedText}\n\`\`\``;
        break;
      default:
        return;
    }
    
    const newContent = note.content.substring(0, start) + newText + note.content.substring(end);
    setNote(prev => ({ ...prev, content: newContent }));
    
    // 重新聚焦并设置光标位置
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + newText.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title.trim() && note.content.trim()) {
      onSave({
        ...note,
        id: note.id || Date.now().toString(),
        date: note.date || new Date().toISOString()
      });
      // 如果是新建笔记，则清空表单
      if (!initialNote.id) {
        setNote({ title: '', content: '' });
      }
    }
  };

  return (
    <EditorContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">笔记标题</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="输入笔记标题..."
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="content">笔记内容</Label>
          <EditorWrapper>
            <ToolbarWrapper>
              <ToolbarButton type="button" onClick={() => handleFormat('bold')} title="加粗">
                加粗
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleFormat('italic')} title="斜体">
                斜体
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleFormat('heading')} title="标题">
                标题
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleFormat('link')} title="链接">
                链接
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleFormat('list')} title="列表">
                列表
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleFormat('code')} title="代码">
                代码
              </ToolbarButton>
              <ToolbarButton type="button" onClick={() => handleFormat('codeblock')} title="代码块">
                代码块
              </ToolbarButton>
            </ToolbarWrapper>
            <textarea
              ref={textareaRef}
              id="content"
              name="content"
              value={note.content}
              onChange={handleChange}
              placeholder="输入笔记内容..."
              required
            />
          </EditorWrapper>
        </FormGroup>
        <ButtonGroup>
          <Button type="submit">
            {initialNote.id ? '更新笔记' : '保存笔记'}
          </Button>
        </ButtonGroup>
      </form>
    </EditorContainer>
  );
};

export default NoteEditor;