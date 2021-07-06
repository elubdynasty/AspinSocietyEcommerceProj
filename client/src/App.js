import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Container, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './actions/userActions';

import Home from "./components/pages/home";
import Login from './components/login';
import Register from "./components/register";
import Profile from './components/profile';
import Search from './components/search'
import Cart from "./components/cart";
import Shipping from './components/shipping'
import NavContainer from "./components/navbar";
import Footer from './components/footer'
import NoMatch from './components/pages/no-match'
import ProductDetail from './components/pages/productdetail'
import SearchResults from './components/pages/search-results'
import Icons from './helpers/icons'



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
          </div>
        </Container>

        <NavContainer />

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
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
