import React from "react";
import SearchItem from "./SearchItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

// functional component for displaying the items
const Items = ({ items, loading }) => {
  if (loading) {
    // if loading is true then the loading spinner is displayed
    return <Spinner />;
  } else
    return (
      // if loading is false then the items will be displayed by mapping over them using props

      <div style={itemStyle}>
        {items.map(item => (
          // displaying a search item component for each of the search results
          <SearchItem key={items.trackId} item={item} />
        ))}
      </div>
    );
};
// using a style variable for each item
const itemStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gridGap: "1rem"
};

Items.propTypes = {
  items: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Items;
