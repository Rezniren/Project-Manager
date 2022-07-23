import React, { Component } from "react";
import LoginDataService from "../services/login.service"


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.onChangeUserName = this.onChangeUserName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
        this.state = {
            username: "",
            password: ""
        };
    }
    onChangeUserName(e) {
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    submitLogin(e) {
        let data = {
            name: this.state.username,
            password: this.state.password,
        };
        LoginDataService.findUser(data)
            .then(response => {
                this.setState({
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        return (
            <div>
                <ul className="CategoryList login">
                    <h4 className="title-center card-category-name">Login</h4>
                    <li>
                        <label className="card-category-name">Username</label>
                        <input type="text"
                               className="form-control"
                               id="username"
                               required
                               value={this.state.username}
                               onChange={this.onChangeUserName}
                               name="name"/>
                    </li>
                    <li>
                        <label className="card-category-name">Password</label>
                        <input type="password"
                               className="form-control"
                               id="password"
                               minLength="8"
                               required
                               value={this.state.password}
                               onChange={this.onChangePassword}
                               name="password"/>
                    </li>
                    <li>
                        <button onClick={this.submitLogin} className="btn btn-success">
                            Submit
                        </button>
                    </li>
                </ul>

            </div>
        );
    }
}