import React from 'react';
import styles from './styles.module.sass';
import SomePost from './Pages/SomePost';
import Navbar from './Pages/Navbar';

const App = () => (
  <div className={styles.appWrapper}>
    <Navbar />
    <SomePost />
  </div>
);

export default App;
