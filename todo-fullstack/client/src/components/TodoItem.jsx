import React, { useState } from 'react';

export default function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    const handleUpdate = () => {
        if (!editTitle.trim()) {
            setEditTitle(todo.title);
            setIsEditing(false);
            return;
        }
        onUpdate(todo._id, { title: editTitle.trim() });
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleUpdate();
        if (e.key === 'Escape') {
            setEditTitle(todo.title);
            setIsEditing(false);
        }
    };

    return (
        <li className="flex items-center justify-between gap-3 p-3.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-sm hover:border-slate-300 dark:hover:border-slate-600 transition-all">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo._id, !todo.completed)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-700 cursor-pointer"
                />

                {isEditing ? (
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={handleUpdate}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        className="w-full px-2 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white rounded border border-indigo-500 focus:outline-none"
                    />
                ) : (
                    <div className="flex flex-col min-w-0">
                        <span
                            className={`text-sm truncate cursor-pointer ${todo.completed
                                    ? 'line-through text-slate-400 dark:text-slate-500'
                                    : 'text-slate-800 dark:text-slate-100'
                                }`}
                            onDoubleClick={() => setIsEditing(true)}
                        >
                            {todo.title}
                        </span>
                        <span className="text-[10px] text-slate-400">
                            {new Date(todo.createdAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                            })}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-xs text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    {isEditing ? 'Save' : 'Edit'}
                </button>
                <button
                    onClick={() => {
                        if (window.confirm('Delete this task?')) onDelete(todo._id);
                    }}
                    className="text-xs text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                >
                    Delete
                </button>
            </div>
        </li>
    );
}