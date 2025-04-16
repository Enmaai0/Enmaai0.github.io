import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import GlobalStyles from './components/GlobalStyles'
import NoteEditor from './components/NoteEditor'
import NotesList from './components/NotesList'
import windowsLogo from './assets/windows_vista/vista_white.ico'
import backgroundImage from './assets/images/background.png'
import './App.css'
import './index.css'

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
  return (
    <Router>
      <GlobalStyles />
      <Sidebar>
        <Logo>
          <img src={windowsLogo} alt="Logo" />
          <h1>技术学习笔记</h1>
        </Logo>
        
        <NavSection>
          <h2>导航</h2>
          <NavItem to="/">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path></svg>
            首页
          </NavItem>
          <NavItem to="/notes">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path></svg>
            学习笔记
          </NavItem>
          <NavItem to="/projects">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z"></path></svg>
            项目展示
          </NavItem>
          <NavItem to="/resources">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"></path></svg>
            资源链接
          </NavItem>
        </NavSection>
      </Sidebar>
      
      <Content>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </Content>
    </Router>
  )
}

export default App
