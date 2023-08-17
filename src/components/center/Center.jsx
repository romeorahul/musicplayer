import React from 'react'
import styles from './center.module.css';
import SearchForm from '../searchform/Searchform';


function Center() {
  return (
    <div className={styles.container}>
      <h1>Recently Played</h1>
      <SearchForm />
    </div>
  )
}

export default Center
