
import { Container, Row, Col, Card, Navbar, Badge, Button } from 'react-bootstrap';
import UserNameInput from './UserNameInput';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { useAppDispatch, useAppSelector } from './hooks';
import Login from './Login';
import { logout } from './authSlice';

function App() {
  const userName = useAppSelector((state) => (state.user as { name: string }).name);
  const todoCount = useAppSelector((state) => (state.todos as { items: unknown[] }).items.length);
  const isAuthenticated = useAppSelector((state) => (state as any).auth.isAuthenticated as boolean);
  const loadingAuth = useAppSelector((state) => (state as any).auth.loading as boolean);
  const dispatch = useAppDispatch();
  return (
    <Container fluid className="min-vh-100 d-flex flex-column p-0">
      <Navbar expand="md" bg="transparent" className="px-3 py-3 nav-gradient text-white">
        <Navbar.Brand className="fw-semibold text-white">⚡ Modern Todo</Navbar.Brand>
        <div className="ms-auto d-flex align-items-center gap-3">
          {isAuthenticated && (
            <span className="small d-none d-md-inline">{userName ? `Hi, ${userName}` : 'Welcome'}</span>
          )}
          <Badge bg="light" text="dark" pill>{todoCount} items</Badge>
          {isAuthenticated ? (
            <Button size="sm" variant="outline-light" disabled={loadingAuth} onClick={() => dispatch(logout())}>
              Logout
            </Button>
          ) : null}
        </div>
      </Navbar>

      {isAuthenticated ? (
        <Row className="g-4 flex-grow-1 px-3 pb-3">
          <Col xs={12} md={4} lg={3} className="d-flex">
            <Card className="w-100 h-100 glass shadow-sm">
              <Card.Body>
                <h5 className="mb-3">Profile</h5>
                <UserNameInput />
                <hr />
                <h5 className="mb-3">Add Todo</h5>
                <TodoInput />
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={8} lg={9} className="d-flex">
            <Card className="w-100 h-100 d-flex glass shadow-sm">
              <Card.Header className="bg-transparent border-0 px-3 pt-3">
                <h5 className="mb-0">Your Todos</h5>
              </Card.Header>
              <Card.Body className="d-flex flex-column p-0">
                <div className="p-3 flex-grow-1 overflow-auto">
                  <TodoList />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <div className="d-flex flex-column flex-grow-1">
          <Login />
        </div>
      )}
    </Container>
  );
}

export default App;

