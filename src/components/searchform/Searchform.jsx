// components/SearchForm.js
"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLazyQuery } from '@apollo/client';
import { GET_SONGS } from "@/utils/query";
import client from "@/utils/apolloClient";
import styles from './search.module.css';

function SearchForm() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const [getSongs, { data }] = useLazyQuery(GET_SONGS, { client });
  console.log({data});

//   useEffect(() => {
//     if (query.length > 0) {
//       // Fetch search results when the query changes
//       getSongs({ variables: { search: query, songType: 'FOR_YOU' } });
//     } else {
//       setSearchResults([]);
//     }
//   }, [query, getSongs]);

//   useEffect(() => {
//     if (data) {
//       setSearchResults(data.getSongs);
//     }
//   }, [data]);

  useEffect(() => {
    if (data && data.getSongs) {
      setSearchResults(data.getSongs);
      
      // Log the fetched data to the console
      console.log('Fetched data:', data.getSongs);
    }
  }, [data]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className={styles.formContainer}>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">Search</button>

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map(result => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SearchForm;
