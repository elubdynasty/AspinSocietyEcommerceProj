import { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "./FormContainer";
import CheckoutProcedures from "../components/checkoutProcedures";
import { savePaymentType } from "../actions/cartActions";

const Payment = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAdd } = cart;

  if(!shippingAdd){
      history.push('/shipping')
  }

  const [paymentType, setPaymentType] = useState('PayPal');


  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentType(paymentType));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutProcedures step1 step2 step3 />
      <h1>Payment Type</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Type</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentType"
              value="PayPal"
              checked
              onChange={(e) => setPaymentType(e.target.value)}
            ></Form.Check>

          </Col>
        </Form.Group>

        <br />
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Payment;
