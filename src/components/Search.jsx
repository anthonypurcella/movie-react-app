import React from 'react';


const Search = ({ searchTerm, setSearchTerm }) => {

    return ( 
        <div className='search'>
            <div>
                <img src='search.svg' alt='search'/>
                <input 
                    type='text'
                    placeholder='Search for any movie!'
                    value={searchTerm}
                    // This is listening for search term to be entered to set it as the search term ('e' is short for event)
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
     );
}
 
export default Search;