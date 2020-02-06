import React, { Component } from "react";
import Axios from "axios";
import Table from "react-bootstrap/Table";

class Favourites extends Component {
  state = {
    favList: []
  };

  // componentdidmount method fetches the favourites list from the backend
  async componentDidMount() {
    const res = await Axios.get("/favourites");
    let favs = res.data;

    console.log(res.data);
    // setting the state to the results of the fetch
    this.setState({
      favList: favs
    });
  }

  // delete favourite function uses the id of the selected favourite to send delete request to backend
  deleteFavourite = e => {
    console.log(e);
    Axios.delete(`/favourites/${e}`);
    // calling componentdidmount in order to refresh the page so the the deleted item is removed
    this.componentDidMount();
  };

  render() {
    // using the favlist in state to map over favourite info and display a new table row for each one
    let favList = this.state.favList.map(favourite => {
      return (
        <tr key={favourite.trackId}>
          <td>{favourite.trackName}</td>
          <td>{favourite.collectionName}</td>
          <td>{favourite.releaseDate}</td>
          <td>{favourite.kind}</td>
          <td>
            {/* delete buttion uses the id to send to delete function */}
            <i
              onClick={this.deleteFavourite.bind(this, favourite.trackId)}
              className="fas fa-times fa-2x"
              id="deleteButton"
            ></i>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <h2 class="fav">Favourites:</h2>
        <div className="container">
          <Table striped bordered hover variant="dark">
            <thead className="favs">
              <tr>
                <th>Title</th>
                <th>Collection</th>
                <th>Release Date</th>
                <th>Media Type</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {/* using the array of favourite items to map through and display content */}
              {favList}
              {/* favlist items */}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

export default Favourites;
