import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Container, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import Home from "./components/pages/home";
import Search from './components/search'
import Cart from "./components/cart";
import Header from './components/header'
import Footer from './components/footer'
import NoMatch from './components/pages/no-match' //TODO: make a route guard for this
import ProductDetail from './components/pages/productdetail'
import SearchResults from './components/pages/search-results'
import Icons from './helpers/icons'




const App = () => {

  Icons();
  return (
    <Router>
      <main className="py-3">
        <Container>
          <LinkContainer to="/">
            <Nav.Link>
              <h1>ASPIN SOCIETY</h1>
            </Nav.Link>
          </LinkContainer>

          <Search />
          <Cart />
        </Container>

        <Header />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/collections/:id" component={ProductDetail} />
          <Route path="/search" component={SearchResults} />
          <Route component={NoMatch} />
        </Switch>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
