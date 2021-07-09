import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Search = () => {
  return (
    <Nav className='mr-auto'>
      <LinkContainer to='/search'>
        <Nav.Link>
          <FontAwesomeIcon icon="search" />
        </Nav.Link>
      </LinkContainer>
    </Nav>
  );
};

export default Search;
