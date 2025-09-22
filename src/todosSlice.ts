import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  name: string;
  completed: boolean;
}

interface TodosState {
  items: Todo[];
}

const initialState: TodosState = {
  items: [],
};

// Simulate async API with setTimeout
export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (name: string) => {
    return new Promise<Todo>((resolve) => {
      setTimeout(() => {
        resolve({ id: Date.now().toString(), name, completed: false });
      }, 300);
    });
  }
);

export const toggleTodo = createAsyncThunk(
  'todos/toggleTodo',
  async (id: string) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 200);
    });
  }
);

export const removeTodo = createAsyncThunk(
  'todos/removeTodo',
  async (id: string) => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve(id);
      }, 200);
    });
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, name }: { id: string; name: string }) => {
    return new Promise<{ id: string; name: string }>((resolve) => {
      setTimeout(() => {
        resolve({ id, name });
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
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.items.push(action.payload);
      })
      .addCase(toggleTodo.fulfilled, (state, action: PayloadAction<string>) => {
        const todo = state.items.find((t) => t.id === action.payload);
        if (todo) todo.completed = !todo.completed;
      })
      .addCase(removeTodo.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<{ id: string; name: string }>) => {
        const todo = state.items.find((t) => t.id === action.payload.id);
        if (todo) todo.name = action.payload.name;
      });
  },
});

export default todosSlice.reducer;
