import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Message from "../../helpers/message";
import Loader from "../../helpers/loader";
import { listAllOrders } from "../../actions/orderActions"

const OrderList = ({ history }) => {

  const dispatch = useDispatch();
  const orderAllList = useSelector((state) => state.orderAllList);
  const { loading, error, orders } = orderAllList;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;



  useEffect(() => {
   if(userInfo && userInfo.isAdmin){
      dispatch(listAllOrders());
   } else {
     history.push('/login')
   }
  }, [dispatch, userInfo, history]);

  
  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  {/* ID */}
                  {order._id}
                </td>

                <td>
                  {/* User */}
                  {order.user && order.user.name ? (
                    order.user.name
                  ) : (
                    <Message variant="danger">{error}</Message>
                  )}
                </td>

                <td>
                  {/* Date */}
                  {order.createdAt.substring(0, 10)}
                </td>

                <td>
                  {/* Total */}${order.totalPrice}
                </td>

                <td>
                  {/* Paid */}
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <FontAwesomeIcon icon="times" style={{ color: "red" }} />
                  )}
                </td>

                <td>
                  {/* Delivered */}
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <FontAwesomeIcon icon="times" style={{ color: "red" }} />
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default OrderList
