import React, { Component } from "react";
import firebase from "../fairbes";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

function samalo(a) {
  //console.log(a);
  var asede = new Date(a * 1000);
  // console.log(asede);
  var samalo = asede.toString();
  //console.log(samalo);
  return samalo;
}

class ShowUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {},
      key: ""
    };
  }

  componentDidMount() {
    const ref = firebase
      .firestore()
      .collection("boards")
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          board: doc.data(),
          key: doc.id,
          time: samalo(doc.data().time),
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  render() {
    if (this.state.board.title == undefined) {
      return (
        <>
          <div class="center">
            <Loader type="Bars" color="#00BFFF" height="100" width="100" />
          </div>
        </>
      );
    } else {
      return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading row">
              <div class="col-3">
                <Link to="/">
                  <button class="btn btn-danger w-100">Kembali</button>
                </Link>
              </div>
              <div class="col-9">
                <h3>{this.state.board.title}</h3>
              </div>
            </div>
            <hr />
            <div class="panel-body">{this.state.board.description}</div>
            <br />
            <div class="alert alert-dark kiri">
              <b>Artikel Oleh : {this.state.board.author}</b>
              <br />
              <p>
                <b>Waktu : </b>
                {this.state.time}
              </p>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default ShowUser;
