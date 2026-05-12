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
  changeIsDoneAction,
  deleteTaskAction,
  saveEditingTaskAction,
  setEditingTaskTitleAction,
  startTaskEditingAction,
  stopTaskEditingAction,
} from '../redux/actions';

const { Text } = Typography;

const TaskItem = ({ task }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const dispatch = useDispatch();
  const editingTaskId = useSelector(store => store.editingTaskId);
  const editingTaskTitle = useSelector(store => store.editingTaskTitle);

  const isTaskEditing = editingTaskId === task.id;

  const deleteTask = taskId => {
    dispatch(deleteTaskAction(taskId));
    toast.success('Задача успешно удалена');
  };

  const changeIsDone = taskId => {
    dispatch(changeIsDoneAction(taskId));
  };

  const startTaskEditing = () => {
    dispatch(startTaskEditingAction(task.id));
    dispatch(setEditingTaskTitleAction(task.title));
  };

  const stopTaskEditing = () => {
    dispatch(stopTaskEditingAction());
  };

  const setEditingTaskTitle = event => {
    dispatch(setEditingTaskTitleAction(event.target.value));
  };

  const saveEditingTask = (editingTaskId, editingTaskTitle) => {
    if (!editingTaskTitle.trim()) {
      toast.error('Новое название не может быть пустым');
      return;
    }

    dispatch(saveEditingTaskAction(editingTaskId, editingTaskTitle));
    dispatch(stopTaskEditingAction());
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
            onClick={startTaskEditing}
          />
          <DeleteOutlined
            style={{ fontSize: '18px', cursor: 'pointer', color: '#ff4d4f' }}
            onClick={() => deleteTask(task.id)}
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
        onChange={setEditingTaskTitle}
        onPressEnter={() => saveEditingTask(editingTaskId, editingTaskTitle)}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => saveEditingTask(editingTaskId, editingTaskTitle)}
        >
          Сохранить
        </Button>
        <Button type="primary" danger onClick={stopTaskEditing}>
          Отмена
        </Button>
      </Space>
    </Flex>
  );
};

export default memo(TaskItem);
