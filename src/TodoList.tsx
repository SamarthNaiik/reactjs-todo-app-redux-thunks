import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { useAppSelector } from './hooks';
import type { RootState } from './store';
import type { Todo } from './todosSlice';
import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
  const todos = useAppSelector((state: RootState) => {
    const user = (state.user as { name: string }).name || '_anon';
    const itemsByUser = (state.todos as { itemsByUser: Record<string, Todo[]> }).itemsByUser;
    return itemsByUser[user] || [];
  });

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
