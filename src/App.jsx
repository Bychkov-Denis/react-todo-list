import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './reset.css';

import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bounce, ToastContainer } from 'react-toastify';
import Container from './components/Container';
import Header from './components/Header';
import InputTask from './components/InputTask';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';

function App() {
  const tasks = useSelector(store => store.tasks.tasks);
  const [filter, setFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.isDone);
      case 'completed':
        return tasks.filter(task => task.isDone);
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return (
    <>
      <Container>
        <Header />
        <TaskFilter
          tasks={tasks}
          currentFilter={filter}
          onFilterChange={setFilter}
        />
        <InputTask />
        <TaskList currentFilter={filter} tasks={filteredTasks} />
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
