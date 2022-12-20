import { SearchOutlined } from '@ant-design/icons'
import React from 'react'
import './SearchBar.css'

function SearchBar() {
  return (
    <div className='customer-search-bar-container'>
        <SearchOutlined style={{color:"#CACACA"}}/>
        <input className='search-bar-input' type="text" placeholder='Search menu' />
    </div>
  )
}

export default SearchBar