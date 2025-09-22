import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FiUser, FiCheck } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from './hooks';
import type { RootState } from './store';
import { setUserName } from './userSlice';

const UserNameInput: React.FC = () => {
  const dispatch = useAppDispatch();
  const name = useAppSelector((state: RootState) => (state.user as { name: string }).name);
  const [input, setInput] = useState(name);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setUserName(input));
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <InputGroup>
        <InputGroup.Text>
          <FiUser />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Enter your name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" variant="secondary" title="Set name">
          <FiCheck className="me-1" /> Set Name
        </Button>
      </InputGroup>
    </Form>
  );
};

export default UserNameInput;
