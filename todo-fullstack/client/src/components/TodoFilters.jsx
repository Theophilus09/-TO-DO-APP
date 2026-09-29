import React from 'react';

export default function TodoFilters({ currentFilter, setFilter }) {
  const filters = ['all', 'active', 'completed'];

  return (
    <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
            currentFilter === filter
              ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}