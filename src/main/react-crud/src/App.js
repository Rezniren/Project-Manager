import React, { Component } from "react";
import { Routes, Link, Route, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddBug from "./components/add-bug.component";
import Bug from "./components/bug.component";
import BugsList from "./components/bugs-list.component";



class App extends Component {
  render() {
    return(
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/bugs" className="navbar-brand">
         Project Management
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/bugs"} className="nav-link">
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
          <Route exact path="/" element={<BugsList/>} />
          <Route exact path="bugs" element={<BugsList/>} />
          <Route exact path="/add" element={<AddBug/>} />
          <Route path="bugs/:id"  element={<Bug/>}/>
        </Routes>
      </div>
    </div>
    );
  }
}
export default App;