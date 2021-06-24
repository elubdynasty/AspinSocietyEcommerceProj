import { Container } from 'react-bootstrap'
import Search from './components/search'
import Cart from "./components/cart";
import Header from './components/header'
import Footer from './components/footer'
import Icons from './helpers/icons'


const App = () => {

  Icons();
  return (
    <>
      <main classname='py-3'>
        <Container>
          <h1>ASPIN SOCIETY</h1>
          <Search />
          <Cart />
        </Container>
        <Header />
      </main>

      <Footer />
    </>
  );
}

export default App;
