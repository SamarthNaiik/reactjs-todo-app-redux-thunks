import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useAppSelector } from './hooks';
import type { RootState } from './store';
import type { Todo } from './todosSlice';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const todos = useAppSelector((state: RootState) => (state.todos as { items: Todo[] }).items);

  if (todos.length === 0) {
    return <div className="text-center text-muted">No todos yet.</div>;
  }

  return (
    <ListGroup>
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ListGroup>
  );
};

export default TodoList;
