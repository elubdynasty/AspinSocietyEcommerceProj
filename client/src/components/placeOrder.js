import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";


import Message from "../components/message";
import CheckoutProcedures from "./checkoutProcedures";
import { createOrder } from '../actions/orderActions'

const PlaceOrder = ({ history }) => {

const dispatch = useDispatch()

const cart = useSelector(state => state.cart)

const addDec = (num) => {
  return Math.round((num * 100) / 100).toFixed(2);
};

cart.itemsPrice = addDec(cart.cartItems.reduce((acc, cartItem) => acc + cartItem.price * cartItem.qty, 0))

const orderCreate = useSelector(state => state.orderCreate)
const { order, success, error } = orderCreate

useEffect(() => {
  if(success){
    history.push(`/order/${order._id}`)
  }
  
  //eslint-disable-next-line
}, [history, success])

const placeOrderHandler = () => {

    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAdd: cart.shippingAdd,
        paymentType: cart.paymentType,
        itemsPrice: cart.itemsPrice,
        shippingFee: cart.shippingFee,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
}

cart.shippingFee = addDec(cart.itemsPrice > 100 ? 0 : cart.itemsPrice*0.15)
cart.taxPrice = addDec(Number(0.1075 * cart.itemsPrice).toFixed(2));
cart.totalPrice = addDec(
  Number(cart.itemsPrice) + Number(cart.shippingFee) + Number(cart.taxPrice)
);


  return (
    <div>
      <CheckoutProcedures step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {cart.shippingAdd.address}, {cart.shippingAdd.city},{" "}
                {cart.shippingAdd.zipcode}, {cart.shippingAdd.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Type</h2>
              <strong>Type: </strong>
              {cart.paymentType}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((cartItem, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={cartItem.image}
                            alt={cartItem.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${cartItem.product}`}>
                            {cartItem.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {cartItem.qty} x ${cartItem.price} = $
                          {cartItem.qty * cartItem.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Items</Col>
                <Col>${cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${cart.shippingFee}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              {error && <Message variant='danger'>{error}</Message>}
            </ListGroup.Item>

            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrder;
