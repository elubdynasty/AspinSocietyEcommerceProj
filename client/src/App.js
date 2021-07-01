import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Home from "./components/pages/home";
import Search from './components/search'
import Cart from "./components/cart";
import Navbar  from './components/navbar'
import Footer from './components/footer'
import NoMatch from './components/pages/no-match'
import ProductDetail from './components/pages/productdetail'
import SearchResults from './components/pages/search-results'
import Icons from './helpers/icons'




const App = () => {

  Icons();
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
          </div>
        </Container>

        <Navbar />

        <Container>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/collections/:id" component={ProductDetail} />
            <Route path="/search" component={SearchResults} />
            <Route path="/cart/:id?" component={Cart} />
            <Route component={NoMatch} />
          </Switch>
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
