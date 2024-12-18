// src/components/EmojiPicker.jsx
import React, { useState } from 'react';

const EmojiPicker = ({ onEmojiSelect }) => {
  const emojis = [
    "😊", "😂", "😍", "😎", "😭", "😢", "😡", "😜", "😏", "😇", "😋", "🥰", "🥺",
    "👍", "👎", "🤔", "🙏", "🤗", "🥳", "🥴", "😷", "🤒", "💀", "👻", "🤖", "💩",
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🦁", "🐯", "🐮", "🐷", "🐵", "🐔", "🦆", "🐦", 
    "🐧", "🐍", "🦓", "🐢", "🦄", "🦋", "🐝", "🐞", "🌸", "🌼", "🌻", "🍀", "🌺", 
    "🍎", "🍌", "🍒", "🍓", "🍇", "🍉", "🍍", "🍑", "🍋", "🍊", "🍈", "🥥", "🥝", 
    "🥑", "🍅", "🍆", "🌽", "🥕", "🥔", "🍠", "🥒", "🥦", "🍄", "🍅", "🌶", "🥬"
  ];
  
  return (
    <div className="dark:bg-slate-800 bg-opacity-50 border p-2 rounded-lg shadow-lg max-h-60 overflow-y-auto">
      <div className="grid grid-cols-6 gap-2">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onEmojiSelect(emoji)}
            className="text-2xl p-2 rounded-lg hover:bg-gray-200 hover:scale-110 transition transform"
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
