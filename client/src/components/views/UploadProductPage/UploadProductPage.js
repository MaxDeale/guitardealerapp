import React, { useState } from "react";
import { Typography, Button, Form, Input } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
const { Title } = Typography;
const { TextArea } = Input;

const brands = [
  { key: 1, value: "Ibanez" },
  { key: 2, value: "Fender" },
  { key: 3, value: "ESP" },
  { key: 4, value: "Epiphone" },
  { key: 5, value: "PRS" },
  { key: 6, value: "Jackson" },
  { key: 7, value: "Aria" },
];
//functional component to upload guitar products
function UploadProductPage(props) {
  //using state to set all necessary values
  const [TitleValue, setTitleValue] = useState("");
  const [DescriptionValue, setDescriptionValue] = useState("");
  const [PriceValue, setPriceValue] = useState(0);
  const [BrandValue, setBrandValue] = useState(1);

  const [Images, setImages] = useState([]);
  //functions take in the event data and use the state setting functions to set values
  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  const onBrandSelectChange = (event) => {
    setBrandValue(event.currentTarget.value);
  };

  const updateImages = (newImages) => {
    setImages(newImages);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    //checking if all data has been filled in
    if (
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !BrandValue ||
      !Images
    ) {
      return alert("Please fill out all necessary fields");
    }

    const items = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      brands: BrandValue,
    };
    //making post request to upload the new product with all the necessary data
    Axios.post("/api/product/uploadProduct", items).then((response) => {
      if (response.data.success) {
        alert("Product successfully uploaded");
        props.history.push("/");
      } else {
        alert("There was an error uploading the product");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "8rem auto", fontSize: "1.5rem" }}>
      <div
        style={{
          textAlign: "center",
          marginBottom: "2rem",
          fontFamily: "pacifico",
        }}
      >
        <Title level={2}> Upload New Product</Title>
      </div>

      <Form  onSubmit={onSubmit}>
        {/* DropZone */}
        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Price:</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <br />
        <br />
        <select onChange={onBrandSelectChange}>
          {brands.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}{" "}
            </option>
          ))}
        </select>
        <br />
        <br />

        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
