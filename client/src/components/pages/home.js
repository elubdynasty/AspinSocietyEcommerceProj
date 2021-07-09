import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import Product from '../product'
import { listProducts } from '../../actions/productActions';
import Message from '../../helpers/message';
import Loader from "../../helpers/loader";

const Home = () => {

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)

    const { loading, error, products } = productList
    
    useEffect(() => {
      dispatch(listProducts())
      
    }, [dispatch])

  

    return (
      <>
        <h3>All Products</h3>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        )}
      </>
    );
}

export default Home
