import {useState } from "react";


function Todo(props){
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState("")


    function handleName(e){
        setNewName(e.target.value)
    }

    function handleSumbit(e){
        e.preventDefault();
        props.EditTask(props.id,newName);
        setNewName("");
        setEditing(false)
    }
    
    const editedTemplate = (
        <form className="stack-small" onSubmit={handleSumbit}>
        <div className="form-group">
          <label className="todo-label" htmlFor={props.id}>
            New name for {props.name}
          </label>
          <input id={props.id} className="todo-text" type="text" onChange={handleName} value={newName}/>
        </div>
        <div className="btn-group">
          <button type="button" className="btn todo-cancel" onClick={()=> setEditing(false)}>
            Cancel
            <span className="visually-hidden">renaming {props.name}</span>
          </button>
          <button type="submit" className="btn btn__primary todo-edit">
            Save
            <span className="visually-hidden">new name for {props.name}</span>
          </button>
        </div>
      </form>
    );

    const viewedTemplate = (
        <div className="stack-small">
        <div className="c-cb">
          <input
            id={props.id}
            type="checkbox"
            defaultChecked={props.completed}
            onChange={() => props.toggleTaskCompleted(props.id)}
          />
          <label className="todo-label" htmlFor={props.id}>
            {props.name}
          </label>
        </div>
        <div className="btn-group">
          <button type="button" className="btn" onClick={()=> setEditing(true)}>
            Edit <span className="visually-hidden">{props.name}</span>
          </button>
          <button
            type="button"
            className="btn btn__danger"
            onClick={() => props.DeleteTask(props.id)}>
            Delete <span className="visually-hidden">{props.name}</span>
          </button>
        </div>
      </div>
    )
    
    return <li className="todo">{isEditing ? editedTemplate: viewedTemplate}</li>
};

export default Todo