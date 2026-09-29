import React, { useState, useEffect } from 'react';
import * as todoApi from './services/todoApi';
import * as noteApi from './services/noteApi';

// Todo Components
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import TodoFilters from './components/TodoFilters';

// Note Components
import NoteForm from './components/notes/NoteForm.jsx';
import NoteList from './components/notes/NoteList.jsx';

// Shared Components
import SearchBar from './components/SearchBar';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('todos'); // 'todos' | 'notes'

  // Data States
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Search States
  const [todoFilter, setTodoFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing Note State
  const [editingNote, setEditingNote] = useState(null);

  // Theme State
  const [darkMode, setDarkMode] = useState(() => {
    return (
      localStorage.getItem('theme') === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  // Apply Dark Mode Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initial Data Fetching
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [fetchedTodos, fetchedNotes] = await Promise.all([
          todoApi.fetchTodos(),
          noteApi.fetchNotes()
        ]);
        setTodos(fetchedTodos);
        setNotes(fetchedNotes);
      } catch (err) {
        setError(err.message || 'Could not connect to the backend server.');
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // --- Todo Actions ---
  const handleAddTodo = async (title) => {
    try {
      const newTodo = await todoApi.createTodo(title);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleToggleTodo = async (id, completed) => {
    try {
      const updated = await todoApi.updateTodo(id, { completed });
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateTodo = async (id, updates) => {
    try {
      const updated = await todoApi.updateTodo(id, updates);
      setTodos((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleClearCompletedTodos = async () => {
    try {
      await todoApi.clearCompletedTodos();
      setTodos((prev) => prev.filter((t) => !t.completed));
    } catch (err) {
      alert(err.message);
    }
  };

  // --- Note Actions ---
  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        const updated = await noteApi.updateNote(editingNote._id, noteData);
        setNotes((prev) => prev.map((n) => (n._id === editingNote._id ? updated : n)));
        setEditingNote(null);
      } else {
        const created = await noteApi.createNote(noteData);
        setNotes((prev) => [created, ...prev]);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await noteApi.deleteNote(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      if (editingNote?._id === id) setEditingNote(null);
    } catch (err) {
      alert(err.message);
    }
  };

  // --- Filter & Search Logic ---
  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      todoFilter === 'all'
        ? true
        : todoFilter === 'active'
          ? !todo.completed
          : todo.completed;
    const matchesSearch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredNotes = notes.filter((note) => {
    const query = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <header className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              TO-DO APP
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              HNG AI Engineering Internship
            </p>
          </div>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </header>

        {/* Global Error Banner */}
        {error && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-sm rounded-lg flex items-center justify-between">
            <span>{error}</span>
            <button
              onClick={() => window.location.reload()}
              className="underline text-xs hover:opacity-80"
            >
              Retry
            </button>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              setActiveTab('todos');
              setSearchQuery('');
            }}
            className={`pb-2.5 px-4 text-sm font-medium transition-colors relative ${activeTab === 'todos'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
          >
            Tasks ({todos.length})
          </button>
          <button
            onClick={() => {
              setActiveTab('notes');
              setSearchQuery('');
            }}
            className={`pb-2.5 px-4 text-sm font-medium transition-colors relative ${activeTab === 'notes'
              ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400'
              : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
              }`}
          >
            Notes ({notes.length})
          </button>
        </div>

        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder={
            activeTab === 'todos'
              ? 'Search tasks by title...'
              : 'Search notes by title or content...'
          }
        />

        {/* Loading Spinner */}
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Loading workspace data...</span>
          </div>
        ) : (
          <main className="space-y-6">
            {/* TODOS TAB */}
            {activeTab === 'todos' && (
              <div className="space-y-4">
                <TodoForm onAddTodo={handleAddTodo} />
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <TodoFilters
                    currentFilter={todoFilter}
                    setFilter={setTodoFilter}
                  />
                </div>
                <TodoList
                  todos={filteredTodos}
                  onToggle={handleToggleTodo}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
                <TodoStats
                  todos={todos}
                  onClearCompleted={handleClearCompletedTodos}
                />
              </div>
            )}

            {/* NOTES TAB */}
            {activeTab === 'notes' && (
              <div className="space-y-6">
                <NoteForm
                  onSaveNote={handleSaveNote}
                  editingNote={editingNote}
                  onCancelEdit={() => setEditingNote(null)}
                />
                <NoteList
                  notes={filteredNotes}
                  onEdit={(note) => setEditingNote(note)}
                  onDelete={handleDeleteNote}
                />
              </div>
            )}
          </main>
        )}
      </div>
    </div>
  );
}