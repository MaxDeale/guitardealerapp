import React, { Component } from "react";

// functional component for search Bar and functionality
class Search extends Component {
  state = {
    text: ""
  };

  onChange = e => {
    // sets state to search value
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    // calling the search items function as a prop with the state value as a parameter
    this.props.searchItems(this.state.text);
    this.setState({
      test: ""
    });
  };

  render() {
    return (
      <div>
        {/* Seach form  */}
        <h2 className="fav">Search</h2>
        <form onSubmit={this.onSubmit} className="form">
          <input
            type="text"
            name="text"
            placeholder="Search iTunes"
            value={this.state.text}
            onChange={this.onChange}
          />
          <input
            type="submit"
            value="Search"
            className=" btn btn-dark btn-block"
          />
        </form>
      </div>
    );
  }
}

export default Search;
