import React from "react";
import "./App.css";
import Layout from "./components/UI/Layout/Layout";
import Router from "./components/Navigation/Router/Router";

function App() {
  return (
    <div className="App">
      <header className=""></header>
      <main>
        <Layout>
          <Router />
        </Layout>
      </main>
    </div>
  );
}

export default App;
