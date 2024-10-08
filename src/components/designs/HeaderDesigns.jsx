import React from "react";
import { IoSearch } from "react-icons/io5";

export const SearchBar = ({className}) => {
  return (
    <div className={`${className ? className : '' }`}>
      <div className="border-2 border-solid border-sblue rounded-md flex items-center justify-center gap-3 py-1.5 mx-2">
        <div>
          <IoSearch className="text-sblue text-xl" />
        </div>
        <h2 className="text-gray-400">Find Cars,Mobile Phones and more...</h2>
      </div>
    </div>
  );
};


