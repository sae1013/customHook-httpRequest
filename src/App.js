import React, { useEffect, useState,useCallback } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/useHttp";
import {FIREBASE_URL} from '../src/config';
function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  const transformTasks = useCallback((data) => {
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }

    setTasks(loadedTasks);
  },[]);

  useEffect(() => {
    const requestConfig = {
      url: FIREBASE_URL
    }

    fetchTasks(requestConfig,transformTasks);
  }, []);

  const taskAddHandler = (task) => { 
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
        onTransformTasks = {transformTasks}
      />
    </React.Fragment>
  );
}

export default App;

// OnFetch는 해당 컴포넌트에서 매개변수 재지정 해주어야함