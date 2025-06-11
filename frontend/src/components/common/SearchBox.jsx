// frontend/src/components/common/SearchBox.jsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({ onSearchSubmit }) => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword(''); // Clear search input after navigating
      if (onSearchSubmit) {
        onSearchSubmit(); // Callback for mobile menu close
      }
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex items-center">
      <input
        type="text"
        name="q"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="p-2 rounded-l-md border border-starnox-primary bg-starnox-dark text-starnox-text-light placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-starnox-secondary focus:border-transparent w-full md:w-auto"
      />
      <button
        type="submit"
        className="p-2 rounded-r-md bg-starnox-primary text-starnox-text-light hover:bg-starnox-secondary hover:text-starnox-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-starnox-secondary focus:ring-offset-2"
      >
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchBox;