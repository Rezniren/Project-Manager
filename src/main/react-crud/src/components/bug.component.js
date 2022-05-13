import React, { Component } from "react";
import BugDataService from "../services/bug.service";
export default class Bug extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getBug = this.getBug.bind(this);
        this.updateTag = this.updateTag.bind(this);
        this.updateBug = this.updateBug.bind(this);
        this.deleteBug = this.deleteBug.bind(this);
        this.state = {
            currentBug: {
                id: null,
                name: "",
                description: "",
                tag: ""
            },
            message: ""
        };
    }

    componentDidMount() {

        this.getBug(this.props.match.params.id);
    }

    onChangeName(e) {
        const name = e.target.value;
        this.setState(function (prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    name: name
                }
            };
        });
    }

    onChangeDescription(e) {
        const description = e.target.value;

        this.setState(prevState => ({
            currentBug: {
                ...prevState.currentBug,
                description: description
            }
        }));
    }

    getBug(id) {
        BugDataService.get(id)
            .then(response => {
                this.setState({
                    currentBug: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateTag(tagTitle) {
        var data = {
            id: this.state.currentBug.id,
            name: this.state.currentBug.name,
            description: this.state.currentBug.description,
            tag: tagTitle
        };
        BugDataService.update(this.state.currentBug.id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentBug: {
                        ...prevState.currentBug,
                        tag: tagTitle
                    }
                }));
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateBug() {
        BugDataService.update(
            this.state.currentBug.id,
            this.state.currentBug
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Bug was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteBug() {
        BugDataService.delete(this.state.currentBug.id)
            .then(response => {
                console.log(response.data);
                this.props.history.push('/bugs')
            })
            .catch(e => {
                console.log(e);
            });
    }
    render () {
        const { currentBug } = this.state;
        return (
            <div>
                {currentBug ? (
                    <div className="edit-form">
                        <h4>Bug</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentBug.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentBug.description}
                                    onChange={this.onChangeDescription}
                                />
                                <div className="form-group">
                                    <label htmlFor="Tag">Tag</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tag"
                                        value={currentBug.tag}
                                        onChange={this.onChangeTag}
                                    />
                                </div>
                            </div>

                        </form>


                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateBug}
                        >
                            Update
                        </button>
                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Bug...</p>
                    </div>
                )}
            </div>
        );
    }
}