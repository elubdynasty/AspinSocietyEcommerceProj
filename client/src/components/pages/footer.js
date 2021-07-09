
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
      <footer>
        <Container>
          <Row>
            <Col className="text-center py-3">
              &copy;2021, Aspin Society. Powered by LeonardLuzon-MERN
            </Col>
          </Row>
        </Container>
      </footer>
    );
}

export default Footer
