import React, { useState, useEffect } from "react";
// import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Signup from "./components/signUp";
import Login from "./components/login";
import ForgotPass from "./components/forgotPass";
import ResetPass from "./components/resetpass";
import Dashboard from "./components/dashboard";
import FolderView from "./components/folderView";
function App() {
  const [user, setUser] = useState();

  const getUser = (username) => {
    setUser(username);
    console.log(window.location.hostname);
  };
  
  return (
    <>
      <BrowserRouter>
        <Header name={user} getUser={getUser} />
        <Route exact path="/" component={Login}></Route>
        <Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/forgotForm" component={ForgotPass}></Route>
        <Route path="/reset" component={ResetPass}></Route>
        <Route
          path="/dashboard/:id"
          component={(props) => <Dashboard getUser={getUser} />}
        ></Route>
        <Route path="/folder/:id/*" component={FolderView}></Route>
      </BrowserRouter>
    </>
  );
}

export default App;
