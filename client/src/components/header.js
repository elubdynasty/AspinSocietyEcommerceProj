import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
    return (
      <header>
        <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
          <Navbar.Brand href="/">MENU</Navbar.Brand>
          {/* Make a ternary operator to display 'MENU' when the screen got smaller */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/collections">
                All Products
              </Nav.Link>
              <Nav.Link href="/collections/face-mask">Face Mask</Nav.Link>
              <Nav.Link href="/collections/jackets-hoodies">
                Jackets/Hoodies
              </Nav.Link>
              <Nav.Link href="/collections/graphic-tees">Graphic Tees</Nav.Link>
              <Nav.Link href="/collections/headwear">Headwear</Nav.Link>
              <Nav.Link href="/collections/bags">Bags</Nav.Link>
              <Nav.Link href="/collections/blogs">Blogs</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    );
}

export default Header
