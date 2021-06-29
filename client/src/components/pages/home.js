import { useState, useEffect } from 'react';
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'

import Product from '../../components/product'

const Home = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {

      const getProducts = async () => {
        const { data } = await axios.get('/api/products')
        setProducts(data)
      }

      getProducts()
    }, [])

    return (
      <>
        <h3>All Products</h3>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </>
    );
}

export default Home
