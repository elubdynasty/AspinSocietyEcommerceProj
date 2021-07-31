import { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Message from "../../helpers/message";
import Loader from "../../helpers/loader";
import { listUsers } from "../../actions/userActions"

const UserList = () => {

  const dispatch = useDispatch();
  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList;

  useEffect(() => {
   dispatch(listUsers())
  }, [dispatch])

  const deleteHandler = (id) => {
    console.log('delete')  
  }
  
  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FontAwesomeIcon icon="check" style={{ color: "green" }} />
                  ) : (
                    <FontAwesomeIcon icon="times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FontAwesomeIcon icon='edit' />
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={() => 
                    deleteHandler(user._id)
                  }>
                    <FontAwesomeIcon icon='trash' />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default UserList
