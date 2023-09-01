import React, { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import styles from "./search.module.css";
import { IoMdSearch } from "react-icons/io";
import { useMyContext } from "../context/MyContext";

function SearchResultDropdown({ searchResults }) {
  if (searchResults.length === 0) {
    return <p>Search your song</p>;
  }
  return (
    <div className={styles.dropdownContainer}>
      <ul className={styles.dropdown}>
        {searchResults.map((result) => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </div>
  );
}

function SearchForm() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);

  const { selectedItem } = useMyContext();

  const GET_SONGS = gql`
    query GetSongs($songType: String!) {
      getSongs(songType: $songType) {
        id
        title
        artist
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_SONGS, {
    variables: { songType: selectedItem },
    skip: query.length < 3,
  });

  useEffect(() => {
    if (data && data.getSongs) {
      setSearchResults(data.getSongs);
    }

    if (error) {
      console.error("GraphQL Error:", error);
    }

    setSearching(false);
  }, [data, error]);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);

    if (inputValue.length >= 3) {
      setSearching(true);
    } else {
      setSearching(false);
      setSearchResults([]);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={styles.formContainer}
      >
        <input
          type="text"
          placeholder="Search Songs / Artists"
          value={query}
          onChange={handleInputChange}
        />
        <button type="submit">
          <IoMdSearch className={styles.searchIcon} />
        </button>
      </form>

      {loading && searching && <p>Loading...</p>}

      <SearchResultDropdown searchResults={searchResults} />
    </div>
  );
}

export default SearchForm;
