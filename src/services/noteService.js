// 笔记数据服务
const STORAGE_KEY = 'vista_tech_notes';

// 获取所有笔记
export const getNotes = () => {
  try {
    const notes = localStorage.getItem(STORAGE_KEY);
    return notes ? JSON.parse(notes) : [];
  } catch (error) {
    console.error('获取笔记失败:', error);
    return [];
  }
};

// 保存所有笔记
export const saveNotes = (notes) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    return true;
  } catch (error) {
    console.error('保存笔记失败:', error);
    return false;
  }
};

// 添加新笔记
export const addNote = (note) => {
  const notes = getNotes();
  const newNote = {
    ...note,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };
  notes.push(newNote);
  saveNotes(notes);
  return newNote;
};

// 更新笔记
export const updateNote = (updatedNote) => {
  const notes = getNotes();
  const index = notes.findIndex(note => note.id === updatedNote.id);
  if (index !== -1) {
    notes[index] = {
      ...updatedNote,
      date: new Date().toISOString() // 更新日期
    };
    saveNotes(notes);
    return true;
  }
  return false;
};

// 删除笔记
export const deleteNote = (id) => {
  const notes = getNotes();
  const filteredNotes = notes.filter(note => note.id !== id);
  if (filteredNotes.length < notes.length) {
    saveNotes(filteredNotes);
    return true;
  }
  return false;
};

// 获取单个笔记
export const getNote = (id) => {
  const notes = getNotes();
  return notes.find(note => note.id === id) || null;
};