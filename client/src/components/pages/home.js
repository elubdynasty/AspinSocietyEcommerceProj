import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Product from '../displays/product'
import { listProducts } from '../../actions/productActions';
import Message from '../../helpers/message';
import Loader from "../../helpers/loader";
import Paginate from '../Paginate';
import Meta from '../Meta'

const Home = ({ match }) => {

    const keyword = match.params.keyword
    
    const pageNumber = match.params.pageNumber || 1 //always be pg.1 if it not specified

    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)

    const { loading, error, products, pages, page } = productList
    
    useEffect(() => {
      dispatch(listProducts(keyword, pageNumber))
      
    }, [dispatch, keyword, pageNumber])

  

    return (
      <>
        <Meta />
        {keyword && <Link to='/' className='btn btn-light'>Go Back</Link> }
        <h3>All Products</h3>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              {products && products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate
              pages={pages}
              page={page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )}
      </>
    );
}

export default Home
