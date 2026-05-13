import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Checkbox,
  Flex,
  Input,
  Space,
  Typography,
  theme,
} from 'antd';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  changeIsTaskDone,
  deleteTask,
  saveEditingTask,
  setEditingTaskTitle,
  startTaskEditing,
  stopTaskEditing,
} from './../redux/tasksSlice';

const { Text } = Typography;

const TaskItem = ({ task }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const dispatch = useDispatch();
  const editingTaskId = useSelector(state => state.editingTaskId);
  const editingTaskTitle = useSelector(state => state.editingTaskTitle);

  const isTaskEditing = editingTaskId === task.id;

  const deleteTodo = taskId => {
    dispatch(deleteTask({ id: taskId }));
    toast.success('Задача успешно удалена');
  };

  const changeIsDone = taskId => {
    dispatch(changeIsTaskDone({ id: taskId }));
  };

  const startTodoEditing = () => {
    dispatch(startTaskEditing({ id: task.id }));
    dispatch(setEditingTaskTitle({ editingTaskTitle: task.title }));
  };

  const stopTodoEditing = () => {
    dispatch(stopTaskEditing());
  };

  const setEditingTodoTitle = event => {
    dispatch(setEditingTaskTitle({ editingTaskTitle: event.target.value }));
  };

  const saveEditingTodo = () => {
    if (!editingTaskTitle.trim()) {
      toast.error('Новое название не может быть пустым');
      return;
    }

    dispatch(saveEditingTask({ id: editingTaskId, editingTaskTitle }));
    dispatch(stopTaskEditing());
    toast.success('Задача успешно отредактирована');
  };

  return !isTaskEditing ? (
    <Card
      style={{
        borderRadius: '8px',
        borderColor: colorPrimary,
      }}
      styles={{ body: { padding: '10px' } }}
    >
      <Flex align="center" justify="space-between" gap={12}>
        <Flex align="center" gap={12} flex={1}>
          <Checkbox
            checked={task.isDone}
            onClick={() => changeIsDone(task.id)}
          />
          <Text delete={task.isDone} style={{ flex: 1, margin: 0 }}>
            {task.title}
          </Text>
        </Flex>
        <Space size="middle">
          <EditOutlined
            style={{ fontSize: '18px', cursor: 'pointer' }}
            onClick={startTodoEditing}
          />
          <DeleteOutlined
            style={{ fontSize: '18px', cursor: 'pointer', color: '#ff4d4f' }}
            onClick={() => deleteTodo(task.id)}
          />
        </Space>
      </Flex>
    </Card>
  ) : (
    <Flex align="center" gap="small">
      <Input
        value={editingTaskTitle}
        placeholder="Введите новое название задачи..."
        autoFocus
        onChange={setEditingTodoTitle}
        onPressEnter={() => saveEditingTodo()}
      />
      <Space>
        <Button type="primary" onClick={() => saveEditingTodo()}>
          Сохранить
        </Button>
        <Button type="primary" danger onClick={stopTodoEditing}>
          Отмена
        </Button>
      </Space>
    </Flex>
  );
};

export default memo(TaskItem);
