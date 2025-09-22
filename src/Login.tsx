import React, { useState } from 'react';
import { Card, Form, Button, InputGroup, Spinner } from 'react-bootstrap';
import { FiLogIn, FiUser } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from './hooks';
import { login } from './authSlice';
import type { RootState } from './store';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((s: RootState) => (s as any).auth.loading as boolean);
  const error = useAppSelector((s: RootState) => (s as any).auth.error as string | undefined);
  const [name, setName] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(login(name));
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center flex-grow-1 px-3">
      <Card className="glass shadow-lg" style={{ maxWidth: 420, width: '100%' }}>
        <Card.Body className="p-4">
          <div className="text-center mb-3">
            <h3 className="mb-1">Welcome</h3>
            <div className="text-muted">Sign in to manage your todos</div>
          </div>
          <Form onSubmit={onSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                <FiUser />
              </InputGroup.Text>
              <Form.Control
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
              />
            </InputGroup>
            {error && (
              <div className="text-danger small mb-2">{error}</div>
            )}
            <div className="d-grid">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? (
                  <><Spinner animation="border" size="sm" className="me-2" /> Signing in...</>
                ) : (
                  <><FiLogIn className="me-2" /> Sign In</>
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
