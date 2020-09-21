import React, { Component } from "react";
import { withCookies } from "react-cookie";
import "./Login.css";
import { Button } from "@material-ui/core";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
class Login extends Component {
  state = {
    credentials: {
      username: "",
      password: "",
    },
    isLoginView: true,
  };
  inputChanged = (event) => {
    let cred = this.state.credentials;
    cred[event.target.name] = event.target.value;
    this.setState({ credentials: cred });
  };
  login = (event) => {
    if (this.state.isLoginView) {
      fetch(`${process.env.REACT_APP_API_URL}/auth/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(this.state.credentials),
      })
        .then((resp) => resp.json())
        .then((res) => {
          console.log(res.token);
          this.props.cookies.set("mr-token", res.token);
          window.location.href = "/movie/";
        })
        .catch((error) => console.log(error));
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/api/users/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(this.state.credentials),
      })
        .then((resp) => resp.json())
        .then((res) => {
          this.setState({ isLoginView: true });
        })
        .catch((error) => console.log(error));
    }
  };
  toggleView = () => {
    this.setState({ isLoginView: !this.state.isLoginView });
  };

  render() {
    return (
      <div className="login">
        <div className="login__container">
          <div className="login__containerHeader">
            <div className="login__Icon">
              <MovieFilterIcon />
            </div>
            <div className="login__Text">
              <h1>{this.state.isLoginView ? "Login" : "Register"}</h1>
            </div>
          </div>
          <span>Username</span>
          <br />

          <input
            type="text"
            name="username"
            value={this.state.credentials.username}
            onChange={this.inputChanged}
          />
          <br />
          <span>Password</span>
          <br />
          <input
            type="password"
            name="password"
            value={this.state.credentials.password}
            onChange={this.inputChanged}
          />
          <br />
          <Button onClick={this.login}>
            {this.state.isLoginView ? "Login" : "Register"}
          </Button>
          <p onClick={this.toggleView}>
            {this.state.isLoginView ? "Create Account" : "Back to login"}
          </p>
        </div>
      </div>
    );
  }
}

export default withCookies(Login);
