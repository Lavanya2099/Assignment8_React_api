import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function EditProduct(props) {
  const [singleProduct, setsingleProduct] = useState({
    productName: "",
    productPrice: "",
    productDescription: "",
    productImageURL: "",
  });

 

  useEffect(() => {
    setsingleProduct({ ...props.selectedProduct });
  }, [props.selectedProduct]);

  let handleClose = () => {
    props.hideShowEditModal();
  };

  let handleProductChange = (event) => {
    setsingleProduct({
      ...singleProduct,
      [event.target.name]: event.target.value,
    });
  };
  let editProduct = async () => {
    try {
      const response = await axios.put(
        `https://ty-shop.herokuapp.com/api/products/${props.selectedProduct._id}`,
        singleProduct
      );
      console.log("edit product response", response);
      if (response.data.error) {
        alert(response.data.message);
      } else {
        props.hideShowEditModal();
        props.fetchProducts();
      }
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };
  return (
    <>
      <Modal show={props.showEditModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
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
          <Button variant="primary" onClick={editProduct}>
            Save Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProduct;
