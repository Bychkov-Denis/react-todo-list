const initialState = {
  tasks: [],
  newTaskTitle: '',
  editingTaskId: null,
  editingTaskTitle: '',
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NEW_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        newTaskTitle: '',
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'CHANGE_IS_DONE':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload ? { ...task, isDone: !task.isDone } : task,
        ),
      };
    case 'SAVE_EDITING_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.editingTaskId
            ? { ...task, title: action.payload.editingTaskTitle }
            : task,
        ),
        editingTaskTitle: '',
        editingTaskId: null,
      };
    case 'SET_EDITING_TASK_TITLE':
      return {
        ...state,
        editingTaskTitle: action.payload,
      };
    case 'SET_NEW_TASK_TITLE':
      return { ...state, newTaskTitle: action.payload };
    case 'START_TASK_EDITING':
      return { ...state, editingTaskId: action.payload };
    case 'STOP_TASK_EDITING':
      return { ...state, editingTaskId: null, editingTaskTitle: '' };
    default:
      return state;
  }
};
