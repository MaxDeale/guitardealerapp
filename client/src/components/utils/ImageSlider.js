import React from "react";
import { Carousel } from "antd";

//custom image slider uses the antD carousel
function ImageSlider(props) {
  return (
    <div>
      {/* passing images in as props and mapping over to display within the carousel */}
      <Carousel autoplay>
        {props.images.map((image, index) => (
          <div key={index}>
            <img
              style={{ width: "100%", maxHeight: "150px" }}
              src={`http://localhost:5000/${image}`}
              alt="productImage"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default ImageSlider;
