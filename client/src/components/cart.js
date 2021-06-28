import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { LinkContainer } from "react-router-bootstrap";

const Cart = () => {
    return (
      <Nav className="mr-auto">
        <LinkContainer to='/cart'>
          <Nav.Link>
            <FontAwesomeIcon icon="shopping-cart" />
          </Nav.Link>
        </LinkContainer>
      </Nav>
    );
}

export default Cart
