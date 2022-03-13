import React from 'react';
import './App.css';
import SearchRepositories from './SearchRepositories.js';
import SearchCommits from './SearchCommits.js';
import Tabs from "./Tabs.js";

function App() {
  return (
      <div className="App">
          <h1 labelv = "App Title">Purdue Interview Application</h1>
          <Tabs>
              <div label = "Repositories">
                  <SearchRepositories></SearchRepositories>
              </div>
              <div label="Commits">
                  <SearchCommits></SearchCommits>
              </div>
          </Tabs>
    </div>
  );
}

export default App;
