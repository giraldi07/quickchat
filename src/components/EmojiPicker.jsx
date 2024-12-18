import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmojiPicker = ({ onEmojiSelect, onClose }) => {
  const [emojis, setEmojis] = useState([]);
  const [filteredEmojis, setFilteredEmojis] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch emojis from the API
    const fetchEmojis = async () => {
      try {
        const response = await axios.get('https://emoji-api.com/emojis?access_key=17fb388ddd2e3d9e0a432215a43d249a7ede9ccf');
        setEmojis(response.data);
        setFilteredEmojis(response.data); // Initially show all emojis
      } catch (error) {
        console.error('Error fetching emojis:', error);
      }
    };

    fetchEmojis();
  }, []);

  // Filter emojis based on search term
  useEffect(() => {
    const searchEmojis = async () => {
      if (searchTerm.trim()) {
        try {
          const response = await axios.get(`https://emoji-api.com/emojis?search=${searchTerm}&access_key=17fb388ddd2e3d9e0a432215a43d249a7ede9ccf`);
          setFilteredEmojis(response.data);
        } catch (error) {
          console.error('Error searching emojis:', error);
        }
      } else {
        setFilteredEmojis(emojis);
      }
    };

    searchEmojis();
  }, [searchTerm, emojis]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleEmojiSelect = (emoji) => {
    onEmojiSelect(emoji.character); // Pass selected emoji character
  };

  return (
    <div className="relative">
      <button 
        type="button" 
        onClick={onClose} 
        className="text-red-600 absolute top-2 right-2 z-30 bg-gray-200 p-1 rounded-full">
        X
      </button>

      {/* Search bar */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search emojis..."
        className="w-full p-2 rounded-lg border border-gray-300 mb-2"
      />
      
      <div className="bg-black bg-opacity-40 border p-2 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-2">
        {/* Emojis Grid */}
        {filteredEmojis.length > 0 ? (
          <div className="grid grid-cols-6 gap-2">
            {filteredEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiSelect(emoji)}
                className="text-2xl p-2 rounded-lg hover:scale-110 transition transform"
              >
                {emoji.character}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-white text-center col-span-6 mt-4">No emojis found</p> // Friendly no-results message
        )}
      </div>
    </div>
  );
};

export default EmojiPicker;
