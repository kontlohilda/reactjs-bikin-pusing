import React, { Component } from "react";
import firebase from "../fairbes";
import "../styles.css";
import Cookies from "universal-cookie";

function ase() {}

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.unsubscribe = null;
  }

  componentDidMount() {
    const cookies = new Cookies();
    cookies.set("name", "", { path: "/" });
    console.log(cookies.get("name"));
    this.props.history.push("/Login");
  }

  render() {
    return <h1>Sedang Logout</h1>;
  }
}

export default Logout;
