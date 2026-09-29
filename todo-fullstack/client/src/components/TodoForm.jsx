import React, { useState } from 'react';

export default function TodoForm({ onAddTodo }) {
    const [title, setTitle] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || isSubmitting) return;

        try {
            setIsSubmitting(true);
            await onAddTodo(title.trim());
            setTitle('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new task..."
                className="flex-1 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSubmitting}
            />
            <button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
            >
                {isSubmitting ? 'Adding...' : 'Add'}
            </button>
        </form>
    );
}