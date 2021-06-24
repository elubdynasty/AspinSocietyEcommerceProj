import { Container } from 'react-bootstrap'
import Header from "./components/header"
import Footer from './components/footer'

const App = () => {
  return (
    <>
      <main>
        <Container>
          <h1>ASPIN SOCIETY</h1>
        </Container>
        <Header />
      </main>

      <Footer />
    </>
  );
}

export default App;
