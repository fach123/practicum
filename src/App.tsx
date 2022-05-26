import React from 'react';
import AppHeader from './components/AppHeader/AppHeader';
import style from './index.module.css';

function App() {
  return (
      <div className={style.main}>
    <AppHeader></AppHeader>
      </div>
  );
}

export default App;
