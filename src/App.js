import React from 'react';
import MemberPageSideBar
  from './components/MemberPageSideBar/MemberPageSideBar';
import MemberProfileForm
  from './components/MemberProfileForm/MemberProfileForm';
import TitleBar from './components/TitleBar/TitleBar';
import './App.css';

function App() {
  return (
    <div className="member-profile-page">
      <TitleBar>MemberProfileProperties</TitleBar>
      <div className="main-content">
        <MemberProfileForm />
        <MemberPageSideBar />
      </div>
    </div>
  );
}

export default App;
