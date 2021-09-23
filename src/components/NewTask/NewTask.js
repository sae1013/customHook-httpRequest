import { useState,useCallback } from 'react';
import useHttp from '../../hooks/useHttp';
import Section from '../UI/Section';
import TaskForm from './TaskForm';
import {FIREBASE_URL} from '../../config';

const NewTask = (props) => {

  const {isLoading,error,sendRequest:sendPostRequest} = useHttp();
  
  const enterTaskHandler = (taskText) => { 
    
    const applyData =(data) => {
      const generatedKey = data.name;
      props.onAddTask({id:generatedKey,text:taskText});
    }

    const requestConfig = {
      url:FIREBASE_URL,
      method:'POST',
      body:{text:taskText},
      headers:{'Content-Type': 'application/json'}
    }
    sendPostRequest(requestConfig,applyData); 
  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

// const data = await response.json();

// const generatedId = data.name; // firebase-specific => "name" contains generated id
// const createdTask = { id: generatedId, text: taskText };
// props.onAddTask(createdTask);