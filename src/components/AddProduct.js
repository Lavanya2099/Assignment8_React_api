import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function AddProduct(props) {
  const [singleProduct, setsingleProduct] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productImageURL: "",
  });

  let handleClose = () => {
    props.hideShowAddModal();
  };
  let handleProductChange = (event) => {
    setsingleProduct({
      ...singleProduct,
      [event.target.name]: event.target.value,
    });
  };

  
  let addProduct = async () => {
    try {
      let response = await axios.post(
        "https://ty-shop.herokuapp.com/api/products",
        singleProduct
      );
      console.log("add api response", response);
      if (response.data.error) {
        alert(response.data.message);
      } else {
    
        props.hideShowAddModal();
    
        props.fetchProducts();
        alert(response.data.message);

        setsingleProduct({
          productName: "",
          productPrice: "",
          productDescription: "",
          productImageURL: "",
        });
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <Modal show={props.showAddModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <label>Product Name</label>
              <input
                type="text"
                className="form-control"
                name="productName"
                value={singleProduct.productName}
                onChange={handleProductChange}
              />
            </div>
            <div>
              <label>Product Price</label>
              <input
                type="number"
                className="form-control"
                name="productPrice"
                value={singleProduct.productPrice}
                onChange={handleProductChange}
              />
            </div>
            <div>
              <label>Product Description</label>
              <input
                type="text"
                className="form-control"
                name="productDescription"
                value={singleProduct.productDescription}
                onChange={handleProductChange}
              />
            </div>
            <div>
              <label>Product Image</label>
              <input
                type="text"
                className="form-control"
                name="productImageURL"
                value={singleProduct.productImageURL}
                onChange={handleProductChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addProduct}>
            Save Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProduct;
