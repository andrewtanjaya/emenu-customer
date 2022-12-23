import { SearchOutlined } from "@ant-design/icons";
import Search from "antd/es/input/Search";
import React from "react";
import "./SearchBar.css";

function SearchBar({ setKeyword }) {
  return (
    <div className="customer-search-bar-container">
      <SearchOutlined style={{ color: "#CACACA" }} />

      <input
        className="search-bar-input"
        type="text"
        placeholder="Search menu"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
    </div>
  );
}

export default SearchBar;
