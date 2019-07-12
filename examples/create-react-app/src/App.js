import React from 'react';
import logo from './logo.svg';
import './App.scss';

import linkStyles from './Link.module.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          See theme at <code>config-overrides.js</code> and the code at <code>src/App.js</code>
        </p>
				<div className="buttons">
					<a
						className={linkStyles.primary}
						href="https://reactjs.org"
						target="_blank"
						rel="noopener noreferrer"
					>
						Learn React
					</a>
					<a
						className={linkStyles.secondary}
						href="https://theme-ui.com/theme-spec"
						target="_blank"
						rel="noopener noreferrer"
					>
						View Theme UI Spec
					</a>
				</div>
      </header>
    </div>
  );
}

export default App;
