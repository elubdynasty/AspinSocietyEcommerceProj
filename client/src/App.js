import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Container, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux'

import { logout } from "./actions/userActions";
import Home from "./components/pages/home";
import Footer from "./components/pages/footer";
import NoMatch from "./components/pages/no-match";
import ProductDetail from "./components/pages/productdetail";
import SearchResults from "./components/pages/search-results";
import Search from './components/pages/search'
import Cart from "./components/pages/cart";
import Shipping from "./components/displays/shipping";
import Payment from "./components/displays/payment";
import Order from "./components/displays/placeOrder";
import OrderInfo from "./components/displays/orderInfo";
import Login from "./components/displays/login";
import Register from "./components/displays/register";
import Profile from "./components/displays/profile";
import UserList from './components/displays/userList';
import UserEdit from "./components/displays/userEdit";
import ProductList from "./components/displays/productList";
import ProductEdit from "./components/displays/productEdit"
import Icons from "./helpers/icons";


const App = () => {

  Icons();

  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <Router>
      <main className="py-3">
        <Container>
          <div className="banner">
            <LinkContainer to="/">
              <Nav.Link>
                <h1>ASPIN SOCIETY</h1>
              </Nav.Link>
            </LinkContainer>

            <Search />

            <LinkContainer to="/cart">
              <Nav.Link>
                <FontAwesomeIcon icon="shopping-cart" />
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <FontAwesomeIcon icon="sign-in-alt" />
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
              <NavDropdown title="Admin" id="adminmenu">
                <LinkContainer to="/admin/userlist">
                  <NavDropdown.Item>Users</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/productlist">
                  <NavDropdown.Item>Products</NavDropdown.Item>
                </LinkContainer>

                <LinkContainer to="/admin/orderlist">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            )}
          </div>
        </Container>

        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile" component={Profile} />
            <Route path="/collections/:id" component={ProductDetail} />
            <Route path="/search" component={SearchResults} />
            <Route path="/cart/:id?" component={Cart} />
            <Route path="/shipping" component={Shipping} />
            <Route path="/payment" component={Payment} />
            <Route path="/placeorder" component={Order} />
            <Route path="/order/:id" component={OrderInfo} />
            <Route path="/admin/userlist" component={UserList} />
            <Route path="/admin/user/:id/edit" component={UserEdit} />
            <Route path="/admin/productlist" component={ProductList} />
            <Route path="/admin/product/:id/edit" component={ProductEdit} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
