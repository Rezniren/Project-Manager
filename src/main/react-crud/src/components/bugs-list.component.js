import React, { Component } from "react";
import BugDataService from "../services/bug.service";
import { Link, useParams } from "react-router-dom";




export default class BugsList extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchName = this.onChangeSearchName.bind(this);
        this.retrieveBugs = this.retrieveBugs.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveBug = this.setActiveBug.bind(this);
        this.removeAllBugs = this.removeAllBugs.bind(this);
        this.searchName = this.searchName.bind(this);
        this.state = {
            bugs: [],
            currentBug: null,
            currentIndex: -1,
            searchName: ""
        };

    }
    componentDidMount() {
        this.retrieveBugs();
    }
    onChangeSearchName(e) {
        const searchName = e.target.value;
        this.setState({
            searchName: searchName
        });
    }
    retrieveBugs() {
        BugDataService.getAll()
            .then(response => {
                this.setState({
                    bugs: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    refreshList() {
        this.retrieveBugs();
        this.setState({
            currentBug: null,
            currentIndex: -1
        });
    }
    setActiveBug(bug, index) {
        this.setState({
            currentBug: bug,
            currentIndex: index
        });
    }
    removeAllBugs() {
        BugDataService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }
    searchName() {
        BugDataService.findByName(this.state.searchName)
            .then(response => {
                this.setState({
                    bugs: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        }

    render() {
        const { searchName, bugs, currentBug, currentIndex } = this.state;
        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by Name"
                            value={searchName}
                            onChange={this.onChangeSearchName}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Card List</h4>
                    <ul className="list-group">
                        {bugs &&
                            bugs.map((bug, index) => (
                                <li
                                    className={
                                        "list-group-item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveBug(bug, index)}
                                    key={index}
                                >
                                    {bug.name}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentBug ? (
                        <div className="boardCard">
                            <h4>Card</h4>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentBug.name}
                            </div>
                            <br/>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentBug.description}
                            </div>
                            <br/>
                            <div>
                                <label>
                                    <strong>Tag:</strong>
                                </label>{" "}
                                {currentBug.tag}
                            </div>
                            <br/>
                            <div>
                                <label>
                                    <strong>Started:</strong>
                                </label>{" "}
                                {currentBug.started}
                            </div>
                            <div>
                                <label>
                                    <strong>Finished:</strong>
                                </label>{" "}
                                {currentBug.finished}
                            </div>
                            <Link
                                to={"/bugs/" + currentBug.id}

                                className="badge badge-warning"
                            >
                                Edit
                            </Link>

                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Card Name...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}