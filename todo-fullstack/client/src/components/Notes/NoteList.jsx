import React from 'react';
import NoteItem from './NoteItem';

export default function NoteList({ notes, onEdit, onDelete }) {
    if (notes.length === 0) {
        return (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
                No notes found. Create your first note above!
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {notes.map((note) => (
                <NoteItem
                    key={note._id}
                    note={note}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}