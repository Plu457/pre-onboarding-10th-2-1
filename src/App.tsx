import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Router from 'routes/router';
import { SearchProvider } from 'context/SearchContext';

const App = () => {
  return (
    <BrowserRouter>
      <SearchProvider>
        <GlobalStyle />
        <Router />
      </SearchProvider>
    </BrowserRouter>
  );
};

export default App;
