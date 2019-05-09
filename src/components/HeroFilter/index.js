import React from 'react'

const HeroFilter = ({ placeholder, handleInputChange, value }) => (
  <div className="search-input">
    <input
      type="text"
      placeholder={placeholder}
      onChange={handleInputChange}
      value={value}
    />
  </div>
)

export default HeroFilter
