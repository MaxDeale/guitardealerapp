import React from "react";
import PropTypes from "prop-types";
import Axios from "axios";

// functional component for displaying one seatch item
const SearchItem = ({
  // saving song search info into props
  item: {
    trackId,
    trackName,
    collectionName,
    releaseDate,
    kind,
    artistViewUrl,
    artworkUrl30
  }
}) => {
  const addFavourite = e => {
    // e.prev

    const favitem = {
      trackId,
      trackName,
      collectionName,
      releaseDate,
      kind,
      artistViewUrl,
      artworkUrl30
    };
    console.log(favitem);
    Axios.post("/favourites", favitem);
    alert("Favourite Added");
  };
  // every search result will return a card with the relevant info as seen below
  return (
    <div
      className="card text-center"
      style={{
        width: "250px",
        textAlign: "center"
      }}
    >
      <img
        style={{
          width: "150px",
          height: "150px",
          textAlign: "center"
        }}
        className="round-img"
        src={artworkUrl30}
        alt="No Image"
      />
      <h5>
        Title:
        <span className="searchResultInfo">{trackName}</span>{" "}
      </h5>
      <h5>
        Collection:
        <span className="searchResultInfo">{collectionName}</span>
      </h5>
      <h5>
        Release Year:{" "}
        <span className="searchResultInfo">{releaseDate.slice(0, 4)}</span>{" "}
      </h5>
      <h5>
        Media Type:
        <span className="searchResultInfo">{kind}</span>{" "}
      </h5>

      <a className="favButton btn btn-primary btn-sm my-1" href={artistViewUrl}>
        View Artist
      </a>
      {/* add to favourites button fires off event that adds the specififc clicked on item info into the backend json file */}
      <a
        className="favButton btn btn-success btn-sm my-1"
        onClick={addFavourite}
        // href={artistViewUrl}
      >
        Add To Favourites
      </a>
    </div>
  );
};

SearchItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default SearchItem;
