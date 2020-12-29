import React from "react";
// import './App.css';
import { BrowserRouter, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Signup from "./components/signUp";
import Login from "./components/login";
import ForgotPass from './components/forgotPass';
import ResetPass from './components/resetpass';
import Dashboard from './components/dashboard';
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/signup" component={Signup}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/forgotForm" component={ForgotPass}></Route>
      <Route path="/reset" component={ResetPass}></Route>
      <Route path="/dashboard" component={Dashboard}></Route>
    </BrowserRouter>
  );
}

export default App;
