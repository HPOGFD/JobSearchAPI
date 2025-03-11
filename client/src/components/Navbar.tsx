import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state with proper typing
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleModalClose = () => setShowModal(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            <span className="fw-bold text-danger">Harry P Oyarvide</span> | Portfolio
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/'>
                About Me
              </Nav.Link>
              <Nav.Link as={Link} to='/projects'>
                Projects
              </Nav.Link>
              <Nav.Link as={Link} to='/posts'>
                Community
              </Nav.Link>
              <Nav.Link as={Link} to='/jobs'>
                Search For Jobs
              </Nav.Link>
              {Auth.loggedIn() && (
                <Nav.Link as={Link} to='/saved'>
                  Saved Jobs
                </Nav.Link>
              )}
            </Nav>
            
            <Nav>
              {Auth.loggedIn() ? (
                <Nav.Link onClick={Auth.logout}>
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  Login/Sign Up
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal
        size='lg'
        show={showModal}
        onHide={handleModalClose}
        aria-labelledby='signup-modal'>
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={handleModalClose} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={handleModalClose} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;