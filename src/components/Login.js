import React, { Component } from "react";
import firebase from "../fairbes";
import "../styles.css";
import Cookies from "universal-cookie";

function ase(name) {
  const cookies = new Cookies();
  cookies.set("name", name, { path: "/" });
  console.log(cookies.get("name"));
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      nama: ""
    };

    this.unsubscribe = null;
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  componentDidMount() {
    const cookies = new Cookies();

    if ((cookies.get("name") !== undefined) || (cookies.get("name") != "")) {
      this.props.history.push("/admin");
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    var citiesRef = firebase.firestore().collection("admin");
    var query = citiesRef
      .where("email", "==", this.state["email"])
      .where("password", "==", this.state["password"]);
    query.get().then(function(querySnapshot) {
      if (querySnapshot.empty) {
        alert("Username/Password Salah");
      } else {
        querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var nama = String(doc.data().name);
          alert("Selamat Datang " + nama);

          ase(nama);

          console.log(doc.id, " => ", doc.data());
          this.props.history.push("/admin");
        });
      }
    });
  };

  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div class="form-group" controlId="email">
            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              class="form-control"
              id="email"
              required=""
              value={this.state.email}
              onChange={this.handleChange}
            />
            <div class="form-group" controlId="password">
              <label for="password">Password</label>
              <input
                type="password"
                name="password"
                class="form-control"
                id="password"
                required=""
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <button
              class="btn btn-success"
              disabled={!this.validateForm()}
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
