import './App.css';
import Todo from './components/Todo';
import FilterButton from './components/FilterButton';
import Form from './components/Form';
import { useState } from 'react';
import { nanoid } from 'nanoid';


const FILTER_MAP = {
  All:() => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed
}

const FILTER_NAME = Object.keys(FILTER_MAP)

function App(props) {
  function addTask(name){
    const newTask = {id:`todo-${nanoid()}`,name,completed:false};
    setTask([...tasks,newTask])
  }

  function toggleTaskCompleted(id){
    const updatedTask = tasks.map((task)=>{
      if(id === task.id){
        return {...task,completed: !task.completed}
      }
      return task
    })
    setTask(updatedTask)
  }

  function DeleteTask(id){
    const remainingTasks = tasks.filter((task)=> id !== task.id)
    setTask(remainingTasks)
  }

  function EditTask(id,newName){
    const editedTasks = tasks.map((task)=>{
      if(id === task.id){
        return {...task,name:newName}
      }
      return task;
    });
    setTask(editedTasks)
  }

  const [filter,setFilter] = useState("All")
  const [tasks,setTask] = useState(props.tasks)
  
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
  <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    DeleteTask={DeleteTask}
    EditTask={EditTask}
  />
));

  const taskNoun = taskList.length !== 1  ? "tasks" : "task"
  const headingText = `${taskList.length} ${taskNoun} remaining`
  const filterList = props.filters?.map((filter)=> <FilterButton name={filter.name}/>)
  const filteringList = FILTER_NAME.map((name)=>(
    <FilterButton name={name} key={name} isPressed={name===filter} setFilter={setFilter}/>
  ))

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
      {filteringList}
      </div>
      <h2 className='list-heading'>{headingText}</h2>
      <ul
      className="todo-list stack-large stack-exception"
      aria-labelledby="list-heading">
        {taskList}
      </ul>
    </div>
  );
}

export default App;
