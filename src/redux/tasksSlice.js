import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  newTaskTitle: '',
  editingTaskId: null,
  editingTaskTitle: '',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addNewTask(state, action) {
      state.tasks.push({
        id: crypto.randomUUID(),
        title: action.payload.newTaskTitle.trim(),
        isDone: false,
      });
      state.newTaskTitle = '';
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(task => task.id !== action.payload.id);
    },
    changeIsTaskDone(state, action) {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id
          ? { ...task, isDone: !task.isDone }
          : task,
      );
    },
    saveEditingTask(state, action) {
      state.tasks = state.tasks.map(task =>
        task.id === action.payload.id
          ? { ...task, title: action.payload.editingTaskTitle }
          : task,
      );
    },
    setEditingTaskTitle(state, action) {
      state.editingTaskTitle = action.payload.editingTaskTitle;
    },
    setNewTaskTitle(state, action) {
      state.newTaskTitle = action.payload.newTaskTitle;
    },
    startTaskEditing(state, action) {
      state.editingTaskId = action.payload.id;
    },
    stopTaskEditing(state) {
      ((state.editingTaskId = null), (state.editingTaskTitle = ''));
    },
  },
});

export const {
  addNewTask,
  deleteTask,
  changeIsTaskDone,
  saveEditingTask,
  setEditingTaskTitle,
  setNewTaskTitle,
  startTaskEditing,
  stopTaskEditing,
} = tasksSlice.actions;
export default tasksSlice.reducer;
