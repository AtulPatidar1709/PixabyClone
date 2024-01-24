import React, { useState, useEffect } from 'react';
import './Search.css';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [suggestions, setSuggestions] = useState(new Set());
    const [categories, setCategories] = useState(new Set());

    const apiKey = '38935622-5004e0429edb1531c070d2b8d';
    const categoriesApiUrl = `https://pixabay.com/api/?key=${apiKey}&image_type=photo&per_page=3`;

    const handleSearch = async () => {
        const searchApiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}`;

        try {
            // Fetch search results
            const searchResponse = await fetch(searchApiUrl);
            const searchData = await searchResponse.json();

            setSearchResults(searchData.hits);

            // Fetch categories
            const categoriesResponse = await fetch(categoriesApiUrl);
            const categoriesData = await categoriesResponse.json();

            if (categoriesData.hits && categoriesData.hits.length > 0) {
                setCategories(new Set(categoriesData.hits.map(category => category.tags)));
            } else {
                console.error('No categories found.');
            }

            // Update suggestions based on search results
            setSuggestions(new Set(searchData.hits.map(result => result.tags)));

            // Open search results in a new tab
            window.open(`https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}`, '_blank');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        // Update suggestions based on user input
        const filteredSuggestions = new Set(
            searchResults
                .filter(result => result.tags.toLowerCase().includes(value.toLowerCase()))
                .map(result => result.tags)
        );

        setSuggestions(filteredSuggestions);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div>
            <div className='searchBar'>
                <div className="InputContainer">
                    <input
                        type="text"
                        name="text"
                        className="input"
                        id="input"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                    />

                    <label htmlFor="input" className="labelforsearch">
                        <svg viewBox="0 0 512 512" className="searchIcon">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                        </svg>
                    </label>
                    <div className="border"></div>
                </div>
            </div>

            {/* <div className="suggestions">
                <ul>
                    {[...suggestions].map((suggestion, index) => (
                        <li className='listSuggest' key={index}>{suggestion}</li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default Search;
