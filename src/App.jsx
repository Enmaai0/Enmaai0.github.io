import { useState, useEffect } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyles from './components/GlobalStyles'
import NoteEditor from './components/NoteEditor'
import NotesList from './components/NotesList'
import windowsLogo from './assets/windows_vista/vista_white.ico'
import backgroundImage from './assets/images/background.png'
import './App.css'
import './index.css'
import { getNotes, addNote, updateNote, deleteNote } from './services/noteService';

// 侧边栏样式组件
const Sidebar = styled.div`
  width: var(--sidebar-width);
  height: 100vh;
  padding: 20px 10px;
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-right: 1px solid rgba(255, 255, 255, 0.95);
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 20px;
  border-radius: 12px;
  height: calc(100vh - 40px);
  z-index: 10;
  overflow-y: auto;
  margin-left: 20px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding: 8px 10px;
  background: linear-gradient(to bottom, #7eb6e9, #5fb2ef);
  border-radius: 8px;
  
  img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
    filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.2));
  }
  
  h1 {
    font-size: 18px;
    color: white;
    margin: 0;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }
`;

const NavSection = styled.div`
  margin-bottom: 20px;
  
  h2 {
    font-size: 14px;
    color: var(--text-color);
    margin-bottom: 10px;
    padding: 0 10px;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 8px 10px;
  margin-bottom: 5px;
  border-radius: var(--border-radius);
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  
  &:hover {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(240, 240, 240, 0.9));
    border: 1px solid rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }
  
  &.active {
    background: linear-gradient(to bottom, #7eb6e9, #5fb2ef);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
  
  svg {
    margin-right: 10px;
    width: 16px;
    height: 16px;
  }
`;

const Content = styled.div`
  margin-left: 0;
  padding: 30px;
  width: calc(var(--max-content-width) - var(--sidebar-width) - 60px);
  min-height: calc(100vh - 40px);
  background-image: url(${backgroundImage});
  background-size: cover;
  background-attachment: fixed;
  margin-left: calc(var(--sidebar-width) + 40px);
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  padding: 0;
  margin-bottom: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
    transform: translateY(-2px);
  }
`;

const CardTitle = styled.div`
  background: linear-gradient(to bottom, #7eb6e9, #5fb2ef);
  padding: 10px 15px;
  color: white;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;

const CardContent = styled.div`
  padding: 15px 20px;
`;

const StyledLink = styled(Link)`
  display: block;
  padding: 8px 10px;
  margin: 5px 0;
  background: linear-gradient(to bottom, #f0f0f0, #e1e1e1);
  border: 1px solid #b5b5b5;
  border-radius: 6px;
  color: var(--text-color);
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: linear-gradient(to bottom, #e9e9e9, #d5d5d5);
    border-color: #999999;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  background: linear-gradient(to bottom, #7eb6e9, #5fb2ef);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: var(--border-radius);
  padding: 8px 16px;
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

const HomePage = () => (
  <div>
    <GlassCard>
      <CardTitle>欢迎来到我的技术博客</CardTitle>
      <CardContent>
        <p>记录Hao的学习笔记和技术心得。</p>
      </CardContent>
    </GlassCard>
    
    <GlassCard>
      <CardTitle>最近学习</CardTitle>
      <CardContent>
        <StyledLink to="/notes/react">React基础知识</StyledLink>
        <StyledLink to="/notes/javascript">JavaScript高级特性</StyledLink>
        <StyledLink to="/notes/css">CSS动画与过渡</StyledLink>
      </CardContent>
    </GlassCard>
  </div>
);

const NotesPage = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [editingNote, setEditingNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // 调试用
  useEffect(() => {
    console.log('isCreating state changed:', isCreating);
  }, [isCreating]);
  
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
  
  // 确保组件挂载时重置状态
  useEffect(() => {
    return () => {
      setIsCreating(false);
      setEditingNote(null);
    };
  }, []);
  
  const handleSaveNote = (note) => {
    if (editingNote) {
      // 更新现有笔记
      setNotes(notes.map(n => n.id === note.id ? note : n));
      setEditingNote(null);
    } else {
      // 添加新笔记
      setNotes([...notes, note]);
    }
    setIsCreating(false);
  };
  
  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsCreating(true);
  };
  
  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    if (editingNote && editingNote.id === id) {
      setEditingNote(null);
      setIsCreating(false);
    }
  };
  
  return (
    <div>
      <GlassCard>
        <CardTitle>学习笔记</CardTitle>
        <CardContent>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p>这里记录我的所有技术学习笔记，可以创建、编辑和管理笔记。其他人也可以创建... 
              <p>懒得给自己写个登录写权限了</p></p>
            {!isCreating && (
              <Button onClick={() => setIsCreating(true)}>
                创建笔记
              </Button>
            )}
          </div>
          
          {isCreating && (
            <NoteEditor 
              onSave={handleSaveNote} 
              initialNote={editingNote || { title: '', content: '' }}
            />
          )}
          
          {!isCreating && (
            <NotesList 
              notes={notes} 
              onEdit={handleEditNote} 
              onDelete={handleDeleteNote}
            />
          )}
        </CardContent>
      </GlassCard>
    </div>
  );
};

const ProjectsPage = () => (
  <GlassCard>
    <CardTitle>项目展示</CardTitle>
    <CardContent>
      <p>这里将展示我的个人(组队)项目和作品集。</p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <StyledLink to="/projects/1">个人博客系统</StyledLink>
        <StyledLink to="/projects/2">在线笔记应用</StyledLink>
        <StyledLink to="/projects/3">天气预报小工具</StyledLink>
      </div>
    </CardContent>
  </GlassCard>
);

const ResourcesPage = () => (
  <GlassCard>
    <CardTitle>资源链接</CardTitle>
    <CardContent>
      <p>这里收集了一些有用的技术资源和学习材料。</p>
      <div className="mt-4 grid grid-cols-1 gap-3">
        <StyledLink to="https://reactjs.org" target="_blank">React官方文档</StyledLink>
        <StyledLink to="https://developer.mozilla.org" target="_blank">MDN Web文档</StyledLink>
        <StyledLink to="https://css-tricks.com" target="_blank">CSS技巧</StyledLink>
      </div>
    </CardContent>
  </GlassCard>
);

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // 加载笔记数据
  useEffect(() => {
    const loadedNotes = getNotes();
    setNotes(loadedNotes);
  }, []);

  // 创建新笔记
  const handleCreateNote = (noteData) => {
    const newNote = addNote(noteData);
    setNotes([...notes, newNote]);
    setIsEditing(false);
    setEditingNote(null);
    return newNote;
  };

  // 更新笔记
  const handleUpdateNote = (updatedNote) => {
    if (updateNote(updatedNote)) {
      setNotes(getNotes()); // 重新获取所有笔记
      setIsEditing(false);
      setEditingNote(null);
      return true;
    }
    return false;
  };

  // 删除笔记
  const handleDeleteNote = (id) => {
    if (deleteNote(id)) {
      setNotes(notes.filter(note => note.id !== id));
      return true;
    }
    return false;
  };

  // 编辑笔记
  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsEditing(true);
  };

  // 取消编辑
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingNote(null);
  };

  return (
    <Router>
      <AppContainer>
        <Header onCreateNote={() => setIsEditing(true)} />
        <MainContent>
          {isEditing ? (
            <NoteEditor 
              note={editingNote} 
              onSave={editingNote ? handleUpdateNote : handleCreateNote}
              onCancel={handleCancelEdit}
            />
          ) : (
            <NotesList 
              notes={notes} 
              onEdit={handleEditNote} 
              onDelete={handleDeleteNote} 
            />
          )}
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App
