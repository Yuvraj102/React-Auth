import React from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

export default class Login extends React.Component {
  constructor() {
    super();
    let loggedIn = false;
    const token = localStorage.getItem("token");
    if (token) loggedIn = true;
    this.state = {
      username: "",
      password: "",
      loggedIn,
      error: "",
    };
    this.onChange = this.onChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }
  onChange(ev) {
    // es6 syntax [variable]:value for setting variable value as a key
    this.setState({
      [ev.target.name]: ev.target.value,
    });
  }
  async formSubmit(ev) {
    ev.preventDefault();
    const { username, password } = this.state;
    try {
      // http://localhost:5000/login
      const token = await Axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      //   console.log("got token: ", token.data.token);
      localStorage.setItem("token", token.data.token);
      this.setState({
        loggedIn: true,
      });
    } catch (err) {
      this.setState({
        error: err.message,
      });
      console.log("axios cannot post login", err.message);
    }
  }
  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/user" />;
    }
    return (
      <form onSubmit={this.formSubmit}>
        <input
          type="text"
          placeholder="username"
          value={this.state.username}
          onChange={this.onChange}
          name="username"
        />
        <input
          type="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.onChange}
          name="password"
        />
        <input type="submit" />
      </form>
    );
  }
}
