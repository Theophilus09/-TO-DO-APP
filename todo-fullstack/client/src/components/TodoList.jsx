import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, onUpdate, onDelete }) {
    if (todos.length === 0) {
        return (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-sm">
                No tasks found. Add a task above to get started!
            </div>
        );
    }

    return (
        <ul className="space-y-2.5">
            {todos.map((todo) => (
                <TodoItem
                    key={todo._id}
                    todo={todo}
                    onToggle={onToggle}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
            ))}
        </ul>
    );
}