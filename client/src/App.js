import { Container } from 'react-bootstrap'
import Search from './components/search'
import Cart from "./components/cart";
import Header from './components/header'
import Footer from './components/footer'
import Home from './components/pages/home';
import Icons from './helpers/icons'




const App = () => {

  Icons();
  return (
    <>
      <main className='py-3'>
        <Container>
          <h1>ASPIN SOCIETY</h1>
          <Search />
          <Cart />
        </Container>
        <Header />
        <Home />
      </main>

      <Footer />
    </>
  );
}

export default App;
