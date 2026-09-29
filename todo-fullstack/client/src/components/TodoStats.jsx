import React from 'react';

export default function TodoStats({ todos, onClearCompleted }) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 text-sm">
      <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
        <span>Total: <strong className="text-slate-900 dark:text-white">{total}</strong></span>
        <span>Active: <strong className="text-amber-600 dark:text-amber-400">{active}</strong></span>
        <span>Completed: <strong className="text-emerald-600 dark:text-emerald-400">{completed}</strong></span>
      </div>

      {completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-xs text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 underline transition-colors"
        >
          Clear completed ({completed})
        </button>
      )}
    </div>
  );
}