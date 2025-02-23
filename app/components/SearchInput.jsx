import React from 'react'

const SearchInput = ({setCity}) => {
  return (
            <div className="w-[30rem]">
              <input
                type="text"
                placeholder="Search city..."
                className="w-full p-4 mb-4 text-black rounded-lg"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
  )
}

export default SearchInput