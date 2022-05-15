import React, { Component } from "react";
import GDataService from "../services/bug.service";
export default class AddG extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTag = this.onChangeTag.bind(this);
        this.onChangeStarted = this.onChangeStarted.bind(this);
        this.onChangeStarted = this.onChangeStarted.bind(this);
        this.saveG = this.saveG.bind(this);
        this.newG = this.newG.bind(this);
        this.state = {
            id: null,
            name: "",
            description: "",
            tag: "",
            started: "",
            finished: "",
        };
    }
    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }
    onChangeTag(e) {
        this.setState({
            tag: e.target.value
        });
    }
    onChangeStarted(e) {
        this.setState({
            started: e.target.value
        })
    }
    onChangeFinished(e) {
        this.setState({
            finished: e.target.value
        })
    }
    saveG() {
        var data = {
            name: this.state.name,
            description: this.state.description,
            tag: this.state.tag,
            started: this.state.started,
            finished: this.state.finished
        };
        GDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    tag:response.data.tag,
                    started:response.data.started,
                    finished:response.data.finished
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    newG() {
        this.setState({
            id: null,
            name: "",
            description: "",
            started: "",
            finished: ""
        });
    }
    render() {
        // ...
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newG}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div className="boardCard">
                        <h4 className="title-center">Card Creation</h4>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={this.state.name}
                                onChange={this.onChangeName}
                                name="name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.description}
                                onChange={this.onChangeDescription}
                                name="description"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="tag">Tag</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tag"
                                required
                                value={this.state.tag}
                                onChange={this.onChangeTag}
                                name="tag"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="started">Started</label>
                            <input
                                type="text"
                                className="form-control"
                                id="started"
                                required
                                value={this.state.started}
                                onChange={this.onChangeStarted}
                                name="started"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="finished">Finished</label>
                            <input
                                type="text"
                                className="form-control"
                                id="finished"
                                required
                                value={this.state.finished}
                                onChange={this.onChangeFinished}
                                name="finished"
                            />
                        </div>
                        <button onClick={this.saveG} className="btn btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}