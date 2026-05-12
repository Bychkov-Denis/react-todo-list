export const addNewTaskAction = newTaskTitle => ({
  type: 'ADD_NEW_TASK',
  payload: {
    id: crypto.randomUUID(),
    title: newTaskTitle.trim(),
    isDone: false,
  },
});

export const deleteTaskAction = taskId => ({
  type: 'DELETE_TASK',
  payload: taskId,
});

export const changeIsDoneAction = taskId => ({
  type: 'CHANGE_IS_DONE',
  payload: taskId,
});

export const setNewTaskTitleAction = newTaskTitle => ({
  type: 'SET_NEW_TASK_TITLE',
  payload: newTaskTitle,
});

export const setEditingTaskTitleAction = editingTaskTitle => ({
  type: 'SET_EDITING_TASK_TITLE',
  payload: editingTaskTitle,
});

export const saveEditingTaskAction = (editingTaskId, editingTaskTitle) => ({
  type: 'SAVE_EDITING_TASK',
  payload: { editingTaskId, editingTaskTitle },
});

export const startTaskEditingAction = taskId => ({
  type: 'START_TASK_EDITING',
  payload: taskId,
});

export const stopTaskEditingAction = () => ({
  type: 'STOP_TASK_EDITING',
});
