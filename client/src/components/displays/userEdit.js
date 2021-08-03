import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { getUserProf } from "../../actions/userActions";
import FormContainer from "../../helpers/FormContainer";
import Message from "../../helpers/message";
import Loader from "../../helpers/loader";

const UserEdit = ({match, history}) => {

    const userId = match.params.id

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);


    const dispatch = useDispatch();
    const userProf = useSelector((state) => state.userProf);
    const { loading, error, user } = userProf;

    useEffect(() => {
     if(!user.name || user._id !== userId){
        dispatch(getUserProf(userId))
     } else {
        setName(user.name)
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
     }
    }, [user]);

    const submitHandler = (e) => {
      e.preventDefault();

     
    };
     
  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>

              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>

              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

         
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEdit;
