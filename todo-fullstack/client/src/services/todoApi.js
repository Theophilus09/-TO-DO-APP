const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchTodos = async () => {
  const res = await fetch(`${BASE_URL}/todos`);
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
};

export const createTodo = async (title) => {
  const res = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to create todo');
  }
  return res.json();
};

export const updateTodo = async (id, updates) => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!res.ok) throw new Error('Failed to update todo');
  return res.json();
};

export const deleteTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete todo');
  return res.json();
};

export const clearCompletedTodos = async () => {
  const res = await fetch(`${BASE_URL}/todos/completed`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to clear completed todos');
  return res.json();
};