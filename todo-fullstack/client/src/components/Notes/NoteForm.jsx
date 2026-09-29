import React, { useState, useEffect } from 'react';

export default function NoteForm({ onSaveNote, editingNote, onCancelEdit }) {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (editingNote) {
            setTitle(editingNote.title);
            setContent(editingNote.content);
        } else {
            setTitle('');
            setContent('');
        }
    }, [editingNote]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim() || isSubmitting) return;

        try {
            setIsSubmitting(true);
            await onSaveNote({
                title: title.trim(),
                content: content.trim()
            });
            setTitle('');
            setContent('');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {editingNote ? 'Edit Note' : 'Create a New Note'}
            </h3>

            <input
                type="text"
                placeholder="Note Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                disabled={isSubmitting}
            />

            <textarea
                rows="3"
                placeholder="Write note details here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                disabled={isSubmitting}
            />

            <div className="flex justify-end gap-2">
                {editingNote && (
                    <button
                        type="button"
                        onClick={onCancelEdit}
                        className="px-3.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                )}
                <button
                    type="submit"
                    disabled={isSubmitting || !title.trim() || !content.trim()}
                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
                >
                    {isSubmitting ? 'Saving...' : editingNote ? 'Update Note' : 'Add Note'}
                </button>
            </div>
        </form>
    );
}