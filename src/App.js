import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import { useCookies } from 'react-cookie';
import firebase from "./fairbes";
import UserProfile from "./components/UserProfile";
class App extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection("boards");
    this.unsubscribe = null;
    this.state = {
      boards: []
    };
    const [cookies, setCookie] = useCookies(['name']);
    if (cookies == undefined) {
      this.props.history.push("/login");
    }
    console.log(cookies);
  }

  onCollectionUpdate = querySnapshot => {
    const boards = [];
    querySnapshot.forEach(doc => {
      const { title, description, author } = doc.data();
      boards.push({
        key: doc.id,
        doc, // DocumentSnapshot,
        title,
        description,
        author
      });
    });
    this.setState({
      boards
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <br />
          <b>Selamat Datang {UserProfile.getName()}</b>
          <Link to="/logout" class="btn btn-danger">
            Logout
          </Link>
          <hr />

          <div class="panel-heading">
            <h3 class="panel-title">POST LIST</h3>
          </div>
          <div class="panel-body">
            <h4>
              <Link to="/create">+ Tambah Postingan</Link>
            </h4>
            <table class="table table-stripe">
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Deskripsi</th>
                  <th>Pembuat</th>
                </tr>
              </thead>
              <tbody>
                {this.state.boards.map(board => (
                  <tr>
                    <td>
                      <Link to={`/showadmin/${board.key}`}>{board.title}</Link>
                    </td>
                    <td>{board.description}</td>
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

export default App;
