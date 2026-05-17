import { Empty, Flex } from 'antd';
import { memo } from 'react';
import TaskItem from './TaskItem';

const TaskList = ({
  tasks,
  deleteTask,
  changeIsDone,
  saveNewTaskTitle,
  currentFilter,
}) => {
  const message = {
    active: 'Нет активных задач',
    completed: 'Нет выполненных задач',
    all: 'Список задач пуст',
  };

  if (tasks.length === 0) {
    return (
      <Empty
        description={message[currentFilter] || message.all}
        style={{ marginTop: '50px' }}
      />
    );
  }
  return (
    <Flex vertical gap="small">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          changeIsDone={changeIsDone}
          saveNewTaskTitle={saveNewTaskTitle}
        />
      ))}
    </Flex>
  );
};

export default memo(TaskList);
