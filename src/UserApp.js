import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import firebase from "./fairbes";
import loadnyut from "./loadnyut";
import { object } from "prop-types";
import Loader from "react-loader-spinner";
class UserApp extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase
      .firestore()
      .collection("boards")
      .orderBy("time", "desc");
    this.unsubscribe = null;
    this.state = {
      boards: [],
      loding: false
    };
  }

  onCollectionUpdate = querySnapshot => {
    this.setState({
      loding: true
    });
    const boards = [];
    querySnapshot.forEach(doc => {
      const { title, description, author, time } = doc.data();
      boards.push({
        key: doc.id,
        doc, // Docum entSnapshot
        title,
        description,
        author,
        time
      });
    });
    this.setState({
      boards,
      loding: false
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    console.log(this.state["boards"]);
    if (this.state["boards"].length === 0) {
      return <>
      <div class="center">
      <Loader type="Bars" color="#00BFFF" height="100" width="100" />
     
      </div>
    </>;
    } else {
      return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">Judul Aplikasi</h3>
            </div>
            <div class="panel-body">
              <h5>Testing React.js</h5>
              <table class="table table-stripe">
                <thead>
                  <tr>
                    <th>Judul</th>

                    <th>Pembuat</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.boards.map(board => (
                    <tr>
                      <td>
                        <Link to={`/show/${board.key}`}>{board.title}</Link>
                      </td>

                      <td>{board.author}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default UserApp;
