import React, { Component } from "react";
import { useParams } from "react-router-dom";
import BugDataService from "../services/bug.service";

export function withRouter(Children){
    return(props)=>{

        const match  = {params: useParams()};
        return <Children {...props}  match = {match}/>
    }
}

class Bug extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.id);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTag = this.onChangeTag.bind(this);
        this.onChangeStarted = this.onChangeStarted.bind(this);
        this.onChangeFinished = this.onChangeFinished.bind(this);
        this.getBug = this.getBug.bind(this);
        this.updateBug = this.updateBug.bind(this);
        this.deleteBug = this.deleteBug.bind(this);
        this.state = {
            currentBug: {
                id: null,
                name: "",
                description: "",
                tag: "",
                started: "",
                finished: ""
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
        this.setState(function (prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    description: description
                }
            };
        });
    }

    onChangeTag(e) {
        const tag = e.target.value;
        this.setState(function (prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    tag: tag
                }
            };
        });
    }

    onChangeStarted(e) {
        const started = e.target.value;
        this.setState(function (prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    started: started
                }
            }
        });
    }

    onChangeFinished(e) {
        const finished = e.target.value;
        this.setState(function (prevState) {
            return {
                currentBug: {
                    ...prevState.currentBug,
                    finished: finished
                }
            }
        });
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


    updateBug() {
        console.log(this.state.currentBug);
        BugDataService.update(
            this.state.currentBug.id,

            this.state.currentBug
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The Card was updated successfully!"
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
                this.props.history.push('/board')
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
                    <div className="edit-form boardCard boardEdit">
                        <h4 className="title-center">Card Edit</h4>
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

                            </div>
                            <div className="form-group">
                            <label htmlFor="tag">Tag</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tag"
                                value={currentBug.tag}
                                onChange={this.onChangeTag}
                            />
                            </div>
                            <div className="form-group">
                                <label htmlFor="started">Started</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="started"
                                    value={currentBug.started}
                                    onChange={this.onChangeStarted}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="finished">Finished</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="started"
                                    value={currentBug.finished}
                                    onChange={this.onChangeFinished}
                                    />
                            </div>

                        </form>


                        <button
                            type="submit"
                            className="btn btn-success"
                            onClick={this.updateBug}
                        >
                            Update
                        </button>
                        <button
                            type="submit"
                            className="btn btn-danger"
                            onClick={this.deleteBug}
                        >
                            Delete
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
export default withRouter(Bug);