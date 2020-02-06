import React, { Component, Fragment } from "react";
import "./App.css";
import NavBar from "./components/layout/NavBar";
import Items from "./components/items/Items";
import axios from "axios";
import Search from "./components/items/Search";
import Footer from "./components/layout/Footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Favourites from "./components/pages/Favourites";

class App extends Component {
  state = {
    items: [],
    loading: false
  };

  async componentDidMount() {
    this.setState({
      loading: true
    });
  }

  // function to search items make request to api using the text from the search

  searchItems = async text => {
    const res = await axios.get(
      `https://itunes.apple.com/search?term=${text}&limit=20`
    );

    // setting state value for items to the search results data
    this.setState({
      items: res.data.results,
      loading: false
    });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />

          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search searchItems={this.searchItems} />

                    <Items
                      loading={this.state.loading}
                      items={this.state.items}
                    />
                  </Fragment>
                )}
              />
              <Route exact path="/favourites" component={Favourites} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
