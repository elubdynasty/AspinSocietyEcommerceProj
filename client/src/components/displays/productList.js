import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Message from "../../helpers/message";
import Loader from "../../helpers/loader";
// eslint-disable-next-line no-unused-vars
import { listProducts, deleteProduct } from "../../actions/productActions"


const ProductList = ({ history, match }) => {

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //const productDelete = useSelector((state) => state.productDelete);
  //const { success: successDelete } = productDelete;

  useEffect(() => {
   if(userInfo && userInfo.isAdmin){
      dispatch(listProducts());
   } else {
     history.push('/login')
   }
  }, [dispatch, userInfo, history, /*successDelete*/]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")){
      //dispatch(deleteProduct(id));
    }
  }

  const createProductHandler = () => {
      console.log('Product created')
  }

    return (
      <>
        <Row className="align-items-center">
          <Col>
            <h1>Products</h1>
          </Col>

          <Col className="text-end">
            <Button className="my-3" onClick={createProductHandler}>
              <FontAwesomeIcon icon="plus" /> Create Product
            </Button>
          </Col>
        </Row>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    ${product.price}
                  </td>
                  <td>
                    {product.category}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <FontAwesomeIcon icon="edit" />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FontAwesomeIcon icon="trash" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </>
    );
}

export default ProductList
