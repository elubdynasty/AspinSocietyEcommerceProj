import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  listProductDetails,
  updateProduct
} from "../../actions/productActions";
import FormContainer from "../../helpers/FormContainer";
import Message from "../../helpers/message";
import Loader from "../../helpers/loader";
import { PROD_UPDATE_RESET } from "../../constants/productConstants";

const ProductEdit = ({ history, match }) => {

        const productId = match.params.id;

        const [name, setName] = useState("");
        const [price, setPrice] = useState(0);
        const [image, setImage] = useState("");
        const [category, setCategory] = useState("");
        const [countinStock, setCountinStock] = useState(0);
        const [description, setDescription] = useState("");
        const [uploading, setUploading] = useState(false);

        const dispatch = useDispatch();

        const productDetails = useSelector((state) => state.productDetails);
        const { loading, error, product } = productDetails;

        const productUpdate = useSelector((state) => state.productUpdate);
        
        const {
          loading: loadingUpdate,
          error: errorUpdate,
          success: successUpdate,
        } = productUpdate;

        useEffect(() => {

          if(successUpdate){
            dispatch({type: PROD_UPDATE_RESET})
            history.push('/admin/productlist')
          } else {

               if (!product.name || product._id !== productId) {
                 dispatch(listProductDetails(productId));
               } else {
                 setName(product.name);
                 setPrice(product.price);
                 setImage(product.image);
                 setCategory(product.category);
                 setCountinStock(product.countinStock);
                 setDescription(product.description);
               }
          }
         
        }, [product, dispatch, productId, history, successUpdate]);

        const submitHandler = (e) => {
          e.preventDefault();

          dispatch(updateProduct({ 
            _id: productId, 
            name, 
            price, 
            category,
            description,
            image,
            countinStock 
          }));
        };

        const uploadFileHandler = async (e) => {

          const file = e.target.files[0]
          const formData = new FormData()
          formData.append('image', file)
          setUploading(true)

          try {

            const config = {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)

          } catch (err) {
            console.error(err)
            setUploading(false);
          }

        }

  return (
    <>
      <Link to="/admin/productlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>

              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>

              <Form.Control
                type="number"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.File 
                id="image-file" 
                label="Choose File" 
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label>Category</Form.Label>

              <Form.Control
                type="text"
                placeholder="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countinStock">
              <Form.Label>Count In Stock</Form.Label>

              <Form.Control
                type="number"
                placeholder="Enter count in stock"
                value={countinStock}
                onChange={(e) => setCountinStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEdit;
