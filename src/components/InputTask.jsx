import { Button, Flex, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewTaskAction, setNewTaskTitleAction } from '../redux/actions';

const InputTask = () => {
  const newTaskTitle = useSelector(store => store.newTaskTitle);
  const dispatch = useDispatch();

  const setNewTaskTitle = event => {
    dispatch(setNewTaskTitleAction(event.target.value));
  };

  const addNewTask = () => {
    if (!newTaskTitle) {
      toast.error('Название задачи не может быть пустым');
      return;
    }

    dispatch(addNewTaskAction(newTaskTitle));
    toast.success('Новая задача успешно добавлена');
  };

  return (
    <Flex justify="space-between" align="center" gap="small">
      <Input
        value={newTaskTitle}
        placeholder="Введите название задачи..."
        onChange={setNewTaskTitle}
        autoFocus
        onPressEnter={addNewTask}
      />
      <Button type="primary" onClick={addNewTask}>
        Добавить
      </Button>
    </Flex>
  );
};

export default InputTask;
