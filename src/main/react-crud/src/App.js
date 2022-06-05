import React, { Component } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddCard from "./components/add-card.component";
import Card from "./components/card.component";
import CardsList from "./components/cards-list.component";

import Login from "./components/login.component";



class App extends Component {
  render() {
    return(
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/board" className="navbar-brand">
         Project Management
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/board"} className="nav-link">
              Board
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Routes>
          <Route exact path="/" element={<CardsList/>} />
          <Route exact path="board" element={<CardsList/>} />
          <Route exact path="/add" element={<AddCard/>} />
          <Route path="board/:id"  element={<Card/>}/>
          <Route path="login" element={<Login/>}/>
        </Routes>
      </div>
    </div>
    );
  }
}
export default App;