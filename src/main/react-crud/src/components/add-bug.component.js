import React, { Component } from "react";
import GDataService from "../services/bug.service";
export default class AddG extends Component {
    constructor(props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTag = this.onChangeTag.bind(this);
        this.saveG = this.saveG.bind(this);
        this.newG = this.newG.bind(this);
        this.state = {
            id: null,
            name: "",
            description: "",
            tag: ""
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
    saveG() {
        var data = {
            name: this.state.name,
            description: this.state.description,
            tag: this.state.tag
        };
        GDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    tag:response.data.tag
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
            description: ""
        });
    }
    render() {
        // ...
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn2 btn-success" onClick={this.newG}>
                            Add
                        </button>
                    </div>
                ) : (
                    <div>
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
                        <button onClick={this.saveG} className="btn2 btn-success">
                            Submit
                        </button>
                    </div>
                )}
            </div>
        );
    }
}
