"use client";
import React, { useState } from "react"; // Import useState
import { useRouter } from "next/navigation"; // Correctly import next/router
import styles from "./search.module.css";
import { IoMdSearch } from "react-icons/io";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data); // Assuming the API returns an array of results
    } catch (error) {
      console.error("Error fetching search results:", error);
    }

    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} className={styles.formContainer}>
      <input
        type="text"
        placeholder="Search Songs / Artists"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
        <IoMdSearch className={styles.searchIcon} />
      </button>

      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SearchForm;
