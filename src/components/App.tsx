import * as React from 'react';
import './App.css';

import AuthorityView from './AuthorityComponents/AuthorityView';
import CitizenView from './CitizenComponents/CitizenView';

const App = () => {

  const isAuthority = (): boolean => {
    const hostName = window.location.hostname;
    const domains = hostName.split('.');
    return ((domains.length > 1) && (domains[0] === 'gov'));
  }

  const getViewAccordingToUrl = (): JSX.Element => {
    if (isAuthority()) return <AuthorityView />
    return <CitizenView />;
  }

  return (
    <div className="App">
      {getViewAccordingToUrl()}
    </div>
  );
}

export default App;
