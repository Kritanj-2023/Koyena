import React from "react";

export default function SearchBar() {
  return (
    <div className="flex justify-center  bg-white rounded-lg">
      <input
        className="px-4 py-2 w-30 h-7  text-black rounded-l-lg"
        type="text"
        placeholder="Search..."
      />
      <button className="flex items-center justify-center px-4 bg-blue-800 hover:bg-blue-600 rounded-r-lg">
        Search
      </button>
    </div>
  );
}