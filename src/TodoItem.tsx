import React, { useState } from 'react';
import { ListGroup, Button, Form, InputGroup } from 'react-bootstrap';
import { FiEdit2, FiTrash2, FiSave, FiX } from 'react-icons/fi';
import { useAppDispatch } from './hooks';
import { toggleTodo, removeTodo, updateTodo } from './todosSlice';
import type { Todo } from './todosSlice';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.name);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editValue.trim()) {
      dispatch(updateTodo({ id: todo.id, name: editValue }));
      setEditing(false);
    }
  };

  return (
    <ListGroup.Item className="d-flex align-items-center justify-content-between py-3">
      <div className="d-flex align-items-center flex-grow-1">
        <Form.Check
          type="checkbox"
          checked={todo.completed}
          onChange={() => dispatch(toggleTodo(todo.id))}
          className="me-2"
        />
        {editing ? (
          <Form onSubmit={handleUpdate} className="d-flex align-items-center flex-grow-1">
            <InputGroup size="sm" className="me-3">
              <Form.Control
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                autoFocus
              />
              <Button type="submit" size="sm" variant="success" title="Save">
                <FiSave />
              </Button>
              <Button size="sm" variant="outline-secondary" onClick={() => setEditing(false)} title="Cancel">
                <FiX />
              </Button>
            </InputGroup>
          </Form>
        ) : (
          <span className={todo.completed ? 'text-decoration-line-through text-muted' : ''}>
            {todo.name}
          </span>
        )}
      </div>
      <div>
        {!editing && (
          <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => setEditing(true)} title="Edit">
            <FiEdit2 />
          </Button>
        )}
        <Button size="sm" variant="outline-danger" onClick={() => dispatch(removeTodo(todo.id))} title="Delete">
          <FiTrash2 />
        </Button>
      </div>
    </ListGroup.Item>
  );
};

export default TodoItem;
