const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchNotes = async () => {
  const res = await fetch(`${BASE_URL}/notes`);
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
};

export const createNote = async (noteData) => {
  const res = await fetch(`${BASE_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create note');
  }
  return res.json();
};

export const updateNote = async (id, noteData) => {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(noteData),
  });
  if (!res.ok) throw new Error('Failed to update note');
  return res.json();
};

export const deleteNote = async (id) => {
  const res = await fetch(`${BASE_URL}/notes/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete note');
  return res.json();
};