import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const NavContainer = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>MENU</Navbar.Brand>
          </LinkContainer>
          {/* Make a ternary operator to display 'MENU' when the screen got smaller */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/collections">
                <Nav.Link>All Products</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/collections/face-mask">
                <Nav.Link>Face Mask</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/collections/jackets-hoodies">
                <Nav.Link>Jackets/Hoodies</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/collections/graphic-tees">
                <Nav.Link>Graphic Tees</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/collections/headwear">
                <Nav.Link>Headwear</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/collections/bags">
                <Nav.Link>Bags</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/collections/blogs">
                <Nav.Link>Blogs</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default NavContainer;
