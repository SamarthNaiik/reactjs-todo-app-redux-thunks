import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
}

interface TodosState {
  // Map of username -> that user's todos
  itemsByUser: Record<string, Todo[]>;
}

const initialState: TodosState = {
  itemsByUser: {},
};

// Simulate async API with setTimeout
export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (name: string, { getState }) => {
    // We only need to return the todo payload; the reducer will place it under the current user
    const _state = getState() as RootState;
    const user = (_state.user as { name: string }).name || '_anon';
    return new Promise<{ user: string; todo: Todo }>((resolve) => {
      setTimeout(() => {
        resolve({ user, todo: { id: Date.now().toString(), name, completed: false } });
      }, 300);
    });
  }
);

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async (id: string, { getState }) => {
    const _state = getState() as RootState;
    const user = (_state.user as { name: string }).name || '_anon';
    return new Promise<{ user: string; id: string }>((resolve) => {
      setTimeout(() => {
        resolve({ user, id });
      }, 200);
    });
  }
);

export const removeTodo = createAsyncThunk(
  'todos/removeTodo',
  async (id: string, { getState }) => {
    const _state = getState() as RootState;
    const user = (_state.user as { name: string }).name || '_anon';
    return new Promise<{ user: string; id: string }>((resolve) => {
      setTimeout(() => {
        resolve({ user, id });
      }, 200);
    });
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, name }: { id: string; name: string }, { getState }) => {
    const _state = getState() as RootState;
    const user = (_state.user as { name: string }).name || '_anon';
    return new Promise<{ user: string; id: string; name: string }>((resolve) => {
      setTimeout(() => {
        resolve({ user, id, name });
      }, 200);
    });
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<{ user: string; todo: Todo }>) => {
        const { user, todo } = action.payload;
        if (!state.itemsByUser[user]) state.itemsByUser[user] = [];
        state.itemsByUser[user].push(todo);
      })
      .addCase(toggleTodo.fulfilled, (state, action: PayloadAction<{ user: string; id: string }>) => {
        const { user, id } = action.payload;
        const list = state.itemsByUser[user] || [];
        const todo = list.find((t) => t.id === id);
        if (todo) todo.completed = !todo.completed;
      })
      .addCase(removeTodo.fulfilled, (state, action: PayloadAction<{ user: string; id: string }>) => {
        const { user, id } = action.payload;
        const list = state.itemsByUser[user] || [];
        state.itemsByUser[user] = list.filter((t) => t.id !== id);
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<{ user: string; id: string; name: string }>) => {
        const { user, id, name } = action.payload;
        const list = state.itemsByUser[user] || [];
        const todo = list.find((t) => t.id === id);
        if (todo) todo.name = name;
      });
  },
});

export default todosSlice.reducer;
