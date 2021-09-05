import React, { useState, useEffect } from "react";
import List from "./List";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import "./index.css";
import { catagorylist } from "./catagorylist";
const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return (list = JSON.parse(localStorage.getItem("list")));
  } else {
    return [];
  }
};
function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [catagory, setCatagory] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [state, setState] = useState({
    profileImg:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  });

  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      title &&
      description &&
      quantity &&
      price &&
      catagory &&
      height &&
      width &&
      state &&
      isEditing
    ) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return {
              ...item,
              item1: title,
              item2: description,
              item3: quantity,
              item4: price,
              item5: catagory,
              item6: height,
              item7: width,
            };
          }
          return item;
        })
      );
      setTitle("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setCatagory("");
      setHeight("");
      setWidth("");
      //setState("");

      setEditID(null);
      setIsEditing(false);
    } else {
      const newItem = {
        id: new Date().getTime().toString(),
        item1: title,
        item2: description,
        item3: quantity,
        item4: price,
        item5: catagory,
        item6: height,
        item7: width,
        myDate: new Date().toLocaleString(),
      };

      setList([...list, newItem]);
      setDescription("");
      setTitle("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setCatagory("");
      //setState("");
      setHeight("");
      setWidth("");
      alert("item added to list");
    }
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setTitle(specificItem.item1);
    setDescription(specificItem.item2);
    setQuantity(specificItem.item3);
    setPrice(specificItem.item4);
    setCatagory(specificItem.item5);
    setHeight(specificItem.item6);
    setWidth(specificItem.item7);
    //setState(specificItem.item8)
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      //if({profileImg}){
      if (reader.readyState === 2) {
        setState({ profileImg: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const { profileImg } = state;
  //let myImage={profileImg};
  //console.log(myImage)
  return (
    <>
      <Form className="formContainer" onSubmit={handleSubmit}>
        <h4>Add Product Form</h4>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Product Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridCatagory">
            <Form.Label>Catagory</Form.Label>
            <Form.Select
              onSelect={(e) => setCatagory(e)}
              onChange={(e) => setCatagory(e.target.value)}
            >
              {catagorylist.map((item) => (
                <option value={item.catagory}>{item.catagory}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="formGridDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="Number"
              placeholder=""
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridQuantity">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="Number"
              placeholder=""
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridHeight">
            <Form.Label>Height</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formGridWidth">
            <Form.Label>Width</Form.Label>
            <Form.Control
              type="number"
              placeholder=""
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </Form.Group>
        </Row>
        <h5 className="heading">Add Image</h5>
        <div className="img-holder">
          <img
            src={profileImg}
            alt=""
            id="img"
            className="img"
            style={{ height: 250, width: 250, objectFit: "cover" }}
          />
        </div>
        <input
          type="file"
          accept="image/*"
          name="image-upload"
          id="input"
          onChange={imageHandler}
        />

        <br></br>
        <Button
          variant="primary"
          type="submit"
          style={{ marginTop: 15, width: 200, float: "right" }}
        >
          {isEditing ? "Edit" : "Add"}
        </Button>
      </Form>
      <div className="heading-container">
        <div className="head">Title</div>
        <div className="head">Quantity</div>
        <div className="head">Price</div>
        <div className="head">Catagory</div>
        <div className="head">Width</div>
        <div className="head">Height</div>
        <div className="headDate">Date</div>
      </div>
      {list.length > 0 && (
        <div className="product-container">
          <List items={list} editItem={editItem} />
        </div>
      )}
    </>
  );
}
export default App;
