import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FiPlus } from 'react-icons/fi';
import { useAppDispatch } from './hooks';
import { addTodo } from './todosSlice';

const TodoInput: React.FC = () => {
  const [input, setInput] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="Add a todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" variant="primary" title="Add todo">
          <FiPlus className="me-1" /> Add
        </Button>
      </InputGroup>
    </Form>
  );
};

export default TodoInput;
