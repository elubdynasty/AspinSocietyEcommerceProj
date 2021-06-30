import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'

import Product from '../../components/product'
import { listProducts } from '../../actions/productActions';

const Home = () => {

    const dispatch = useDispatch() //instead of using connect, mapstateToProps  etc.

    const productList = useSelector(state => state.productList)

    const { loading, error, products } = productList
    
    useEffect(() => {
      dispatch(listProducts())
      
    }, [dispatch])

  

    return (
      <>
        <h3>All Products</h3>
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h4>{error}</h4>
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
