import React from "react";
import StatusBar from "../components/StatusBar.jsx";

const HomeScreen = () => {
  return (
    <div className="screen home-screen">
      <StatusBar />

      <div className="home-header">
        <h1>morago</h1>
      </div>

      <div className="home-balance">
        <p>My balance</p>
        <h2>50,000</h2>
      </div>

      <button className="btn btn-call">
        Select a translator and call
      </button>

      <div className="home-topics">
        <h3>Popular translation topics</h3>
      </div>

      <div className="home-recent">
        <h3>My recent calls</h3>
      </div>
    </div>
  );
};

export default HomeScreen;