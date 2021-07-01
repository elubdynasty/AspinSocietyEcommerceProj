import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import { listProductDetails } from "../../actions/productActions";
import Message from '../message';
import Loader from '../loader'

const ProductDetail = ({ history, match }) => {

    const [qty, setQty] = useState(0)  

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)

    const { loading, error, product } = productDetails

    useEffect(() => {
      
      dispatch(listProductDetails(match.params.id));
     }, [dispatch, match]);

     
    const addtoCartHandler = () => {
      history.push(`/cart/${match.params.id}?qty=${qty}`);
    }


    return (
      <>
        <Link className="btn btn-dark my-3" to="/">
          Return Home
        </Link>

        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countinStock > 0
                            ? "In Stock"
                            : "Out of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countinStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>

                        <Col>
                          <Form.Control as='select'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          >
                            {[...Array(product.countinStock).keys()].map(count => (
                              <option key={count+1}
                                value={count+1}
                              >
                                {count+1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={() => addtoCartHandler()}
                      className="btn-block"
                      type="button"
                      disabled={product.countinStock === 0}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        )}
      </>
    );
}

export default ProductDetail
