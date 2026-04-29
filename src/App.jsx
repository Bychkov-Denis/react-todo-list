import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './reset.css';

import { useCallback, useMemo, useState } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import Container from './components/Container';
import Header from './components/Header';
import InputTask from './components/InputTask';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');

  const deleteTask = useCallback(
    id => {
      setTasks(tasks => tasks.filter(task => task.id !== id));
      toast.success('Задача успешно удалена');
    },
    [setTasks],
  );

  const changeIsDone = useCallback(
    id => {
      setTasks(tasks =>
        tasks.map(task => {
          if (task.id === id) {
            return { ...task, isDone: !task.isDone };
          } else {
            return task;
          }
        }),
      );
    },
    [setTasks],
  );

  const saveNewTaskTitle = useCallback(
    (id, newTitle) => {
      setTasks(tasks =>
        tasks.map(task => {
          if (task.id === id) {
            return { ...task, title: newTitle };
          } else {
            return task;
          }
        }),
      );
    },
    [setTasks],
  );

  const getFilteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.isDone);
      case 'completed':
        return tasks.filter(task => task.isDone);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  const filteredTasks = getFilteredTasks();

  return (
    <>
      <Container>
        <Header />
        <TaskFilter
          tasks={tasks}
          currentFilter={filter}
          onFilterChange={setFilter}
        />
        <InputTask setTasks={setTasks} />
        <TaskList
          tasks={filteredTasks}
          deleteTask={deleteTask}
          changeIsDone={changeIsDone}
          saveNewTaskTitle={saveNewTaskTitle}
          currentFilter={filter}
        />
      </Container>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
