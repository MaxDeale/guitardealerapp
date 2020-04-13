import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Icon, Col, Card, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import CheckBox from "./Sections/CheckBox";
import spinner from "../../coolSpinner.gif";
import RadioBox from "./Sections/RadioBox";
import { brands, price } from "./Sections/Datas";
import SearchFeature from "./Sections/SearchFeature";
import syles from "../../app.module.css";

const { Meta } = Card;

function LandingPage() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState();
  const [SearchTerms, setSearchTerms] = useState("");

  const [Filters, setFilters] = useState({
    brands: [],
    price: [],
  });

  useEffect(() => {
    const items = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(items);
  }, []);

  const getProducts = (items) => {
    Axios.post("/api/product/getProducts", items).then((response) => {
      if (response.data.success) {
        if (items.loadMore) {
          setProducts([...Products, ...response.data.products]);
        } else {
          setProducts(response.data.products);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("There was an error fetching the product data");
      }
    });
  };

  const onLoadMore = () => {
    let skip = Skip + Limit;

    const items = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };
    getProducts(items);
    setSkip(skip);
  };

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={8} xs={24}>
        <Card
          hoverable={true}
          cover={
            <a href={`/product/${product._id}`}>
              {" "}
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`R${product.price}`} />
        </Card>
      </Col>
    );
  });

  const showFilteredResults = (filters) => {
    const items = {
      skip: 0,
      limit: Limit,
      filters: filters,
    };
    getProducts(items);
    setSkip(0);
  };

  const handlePrice = (value) => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    console.log("array", array);
    return array;
  };
  // handle guitar product filter function takes in the filter values and category(price or guitars)
  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    if (category === "price") {
      let priceValues = handlePrice(filters);
      newFilters[category] = priceValues;
    }

    console.log(newFilters);

    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const updateSearchTerms = (newSearchTerm) => {
    const items = {
      skip: 0,
      limit: Limit,
      filters: Filters,
      searchTerm: newSearchTerm,
    };

    setSkip(0);
    setSearchTerms(newSearchTerm);

    getProducts(items);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto", marginTop: "8rem" }}>
      <div
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontFamily: "pacifico",
        }}
      >
        <h2> Products:</h2>
      </div>

      {/* Filter  */}

      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            list={brands}
            handleFilters={(filters) => handleFilters(filters, "brands")}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioBox
            list={price}
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>

      {/* Search  */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "1rem auto",
        }}
      >
        <SearchFeature refreshFunction={updateSearchTerms} />
      </div>

      {Products.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2>
            <img src={spinner} alt="" />
          </h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>{renderCards}</Row>
        </div>
      )}
      <br />
      <br />
      {/* checking of the amount of items is bigger than the set post size, if it is then the load more button is shown */}
      {PostSize >= Limit && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={onLoadMore}>Load More</button>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
