import { useState, useEffect } from "react";
import axios from 'axios'
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Message from "../../helpers/message";
import Loader from '../../helpers/loader'
import { getOrderInfo, payOrder, deliverOrder } from "../../actions/orderActions";
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from "../../constants/orderConstants";


const OrderInfo = ({ match, history }) => {

  const orderId = match.params.id

  const [sdkReady, setsdkReady] = useState(false)

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderInfo = useSelector((state) => state.orderInfo);
  const { order, loading, error } = orderInfo;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  if(!loading){
    const addDec = (num) => {
    return Math.round((num * 100) / 100).toFixed(2);
  };

  order.itemsPrice = addDec(
    order.orderItems.reduce(
      (acc, orderItem) => acc + orderItem.price * orderItem.qty,
      0
    )
  );

}
  

  useEffect(() => {

    if(!userInfo) {
      history.push('/login')
    }


    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal')
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setsdkReady(true);
      };

      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderInfo(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setsdkReady(true);
      }
    }
  }, [userInfo, history, dispatch, orderId, successPay, order, successDeliver]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  }
 
  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  }

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <strong>Email:</strong>
              <p>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong> {order.shippingAdd.address},{" "}
                {order.shippingAdd.city}, {order.shippingAdd.zipcode},{" "}
                {order.shippingAdd.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {Date(order.deliveredAt)}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Type</h2>
              <p>
                <strong>Type: </strong>
                {order.paymentType}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Paid on {Date(order.paidAt)}
                </Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((orderItem, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={orderItem.image}
                            alt={orderItem.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${orderItem.product}`}>
                            {orderItem.name}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {orderItem.qty} x ${orderItem.price} = $
                          {orderItem.qty * orderItem.price}
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
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Shipping</Col>
                <Col>${order.shippingFee}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Tax</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>

            {!order.isPaid && (
              <ListGroup.Item>
                {loadingPay && <Loader />}
                {!sdkReady ? (
                  <Loader />
                ) : (
                  <PayPalButton
                    amount={order.totalPrice}
                    onSuccess={successPaymentHandler}
                  />
                )}
              </ListGroup.Item>
            )}
            {loadingDeliver && <Loader />}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn btn-block"
                  onClick={deliverHandler}
                >
                  Mark as Delivered
                </Button>
              </ListGroup.Item>
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default OrderInfo;