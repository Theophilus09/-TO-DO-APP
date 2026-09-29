import React from 'react';

export default function NoteItem({ note, onEdit, onDelete }) {
    const formattedDate = new Date(note.updatedAt || note.createdAt).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className="p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-3">
            <div>
                <h4 className="font-semibold text-slate-900 dark:text-white text-base break-words">
                    {note.title}
                </h4>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap break-words">
                    {note.content}
                </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-400">
                <span>{formattedDate}</span>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(note)}
                        className="text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => {
                            if (window.confirm('Are you sure you want to delete this note?')) {
                                onDelete(note._id);
                            }
                        }}
                        className="text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 font-medium transition-colors"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}