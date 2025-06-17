import React, { useState } from 'react';

const LocationSelector = ({ onSearch, favorites, onSelectFavorite, onRemoveFavorite, currentCity }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput('');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 mb-8 w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex w-full md:w-auto ">
        <input
          type="text"
          className="rounded-l-lg px-4 py-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-64"
          placeholder="Search city..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition"
          aria-label="Search"
        >
          🔍
        </button>
      </form>
      {favorites.length > 0 && (
        <div className="relative w-full md:w-auto">
          <select
            className="rounded-lg px-4 py-2 border border-blue-300 bg-white w-full md:w-56"
            value={currentCity || ''}
            onChange={e => onSelectFavorite(e.target.value)}
          >
            <option value="" disabled>Favorites</option>
            {favorites.map(fav => (
              <option key={fav.name} value={fav.name}>{fav.name}</option>
            ))}
          </select>
          {favorites.length > 0 && (
            <div className="absolute right-2 top-2 flex flex-col gap-1">
              {favorites.map(fav => (
                <button
                  key={fav.name}
                  className="text-xs text-red-400 hover:text-red-600"
                  onClick={e => { e.stopPropagation(); onRemoveFavorite(fav.name); }}
                  title={`Remove ${fav.name}`}
                  type="button"
                >
                  ❌
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSelector; 