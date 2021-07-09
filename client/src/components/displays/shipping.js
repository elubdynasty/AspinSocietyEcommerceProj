import { useState} from "react";
import { Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../../helpers/FormContainer";
import CheckoutProcedures from "../../helpers/checkoutProcedures";
import { saveShippingAdd } from '../../actions/cartActions'


const Shipping = ({ history }) => {

const dispatch = useDispatch()

const cart = useSelector(state => state.cart)
const { shippingAdd } = cart

 const [address, setAddress] = useState(shippingAdd.address)
 const [city, setCity] = useState(shippingAdd.city);
 const [zipcode, setZipcode] = useState(shippingAdd.zipcode);
 const [country, setCountry] = useState(shippingAdd.country);

const submitHandler = (e) => {
    e.preventDefault()

    dispatch(saveShippingAdd({ address, city, zipcode, country }))
    history.push('/payment')
}

  return (
    <FormContainer>
    <CheckoutProcedures step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="zipcode">
          <Form.Label>Zip Code</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter Zip Code"
            value={zipcode}
            onChange={(e) => setZipcode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>

          <Form.Control
            type="text"
            placeholder="Enter Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <br />
        <Button type='submit' variant='primary'>
            Continue
        </Button>

      </Form>
    </FormContainer>
  );
};

export default Shipping;
