import React from "react";
import { Redirect } from "react-router-dom";
import Axios from "axios";

export default class User extends React.Component {
  constructor() {
    super();
    let loggedIn = false;
    const token = localStorage.getItem("token");
    if (token) loggedIn = true;
    this.state = {
      loggedIn,
    };
    this.logout = this.logout.bind(this);
    this.delete_user = this.delete_user.bind(this);
  }
  logout() {
    this.setState({ loggedIn: false });
  }
  async delete_user() {
    let token = localStorage.getItem("token");
    console.log("printing token on client side", token);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const bodyParameters = {};
    try {
      let resp = await Axios.post(
        "http://localhost:5000/delete-user",
        bodyParameters,
        config
      );
      console.log("got response for delete opreation: ", resp);
    } catch (err) {
      console.log("err in deleting request axios: ", err);
    }
  }
  render() {
    if (this.state.loggedIn === false) {
      return <Redirect to="/logout" />;
    }
    return (
      <div>
        <h1>User authenticated</h1>
        <button onClick={this.logout}>Logout</button>
        <button onClick={this.delete_user}>Delete user</button>
      </div>
    );
  }
}
