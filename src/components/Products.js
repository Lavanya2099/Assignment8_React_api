import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import HTTP from "../axiosConfig";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

function Products() {

  const [showAddModal, setshowAddModal] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  const [products, setproducts] = useState([]);
  const [selectedProduct, setselectedProduct] = useState({});
  useEffect(() => {
    fetchProducts();
  }, []);

  let fetchProducts = async () => {
    try {
    
      const response = await HTTP.get("api/products");
  
      if (response.data.error) {
        const errMessage = response.data.message;
      } else {
        const fetchedProducts = response.data.products;
        setproducts(fetchedProducts);
      
      }
    } catch (err) {
      console.log(err);
    }
  };

 
  let updateShowAddModal = () => {
    setshowAddModal(true);
  };
 
  let hideShowAddModal = () => {
    setshowAddModal(false);
  };


  let updateSelectedProduct = (product) => {
   setshowEditModal(true);
    setselectedProduct(product);
  };

  let hideShowEditModal = () => {
    setshowEditModal(false);
  };

  let deleteProduct = async (productId) => {
    try {
      console.log(productId);
      let response = await axios.delete(
        `https://ty-shop.herokuapp.com/api/products/${productId}`
      );
      if (response.data.error) {
        alert(response.data.message);
      } else {
   
        fetchProducts();
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Description</th>
            <th>Product image</th>
            <th>
              <button className="btn btn-warning" onClick={updateShowAddModal}>
                ADD
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 &&
            products.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.productName}</td>
                  <td>{product.productPrice}</td>
                  <td>{product.productDescription}</td>
                  <td>
                    <img
                      width="180px"
                      height="150px"
                      src={product.productImageURL}
                      alt={product.productName}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        updateSelectedProduct(product);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteProduct(product._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <AddProduct
        showAddModal={showAddModal}
        hideShowAddModal={hideShowAddModal}
        fetchProducts={fetchProducts}
      />

      <EditProduct
        showEditModal={showEditModal}
        hideShowEditModal={hideShowEditModal}
        selectedProduct={selectedProduct}
        fetchProducts={fetchProducts}
      />
    </div>
  );
}

export default Products;
