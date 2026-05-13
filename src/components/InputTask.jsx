import { Button, Flex, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewTask, setNewTaskTitle } from './../redux/tasksSlice';

const InputTask = () => {
  const newTaskTitle = useSelector(state => state.newTaskTitle);
  const dispatch = useDispatch();

  const setNewTodoTitle = event => {
    dispatch(setNewTaskTitle({ newTaskTitle: event.target.value }));
  };

  const addNewTodo = () => {
    if (!newTaskTitle.trim()) {
      toast.error('Название задачи не может быть пустым');
      return;
    }

    dispatch(addNewTask({ newTaskTitle }));
    toast.success('Новая задача успешно добавлена');
  };

  return (
    <Flex justify="space-between" align="center" gap="small">
      <Input
        value={newTaskTitle}
        placeholder="Введите название задачи..."
        onChange={setNewTodoTitle}
        autoFocus
        onPressEnter={addNewTodo}
      />
      <Button type="primary" onClick={addNewTodo}>
        Добавить
      </Button>
    </Flex>
  );
};

export default InputTask;
