import './App.css';

import React, { useState, useEffect, useCallback } from 'react';

function App() {

  const [todoList, setTodoList] = useState([
    {
      id: 1,
      activity: 'Cuci motor'
    }
  ]);

  const [currentId, setCurrentId] = useState(1);

  const [inputValue, setInputValue] = useState('');

  const [showClickMeButton, setShowClickMeButton] = useState(false);

  useEffect(() => {
    console.log('Component did update')
    console.log('inputVal: '+ inputValue)
    setCurrentId(todoList[todoList.length-1].id)

  }, [inputValue,todoList,currentId])


    const inputKeyDown = useCallback(                   // IT WORKS SO FINE TOO
    (e) => {
      if (e.key === 'Enter' || e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("btn-add").click();
        return false
      }
    },
    [],
    )
    
    const handleButtonClickedCallback =  () => {
        console.log('Button di klik.');

        let currentInput = inputValue;
        let currentID = currentId
        setTodoList([...todoList, {id: currentID+1, activity: currentInput}]);
      }

        let todoLists = ''
        if(todoList) {
            todoLists = <ListTodo todos={todoList}/>
        }
        
      let todoForm = (
        <form>
          <input type="text" name="todo" className="input-text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} onKeyDown={inputKeyDown}></input>
          <button id="btn-add" type="button" className="btn-add" onClick={handleButtonClickedCallback}>add</button><br/>
            {/* <h2>{JSON.stringify(todoList)}</h2> */}
          <table id="list-todo">
            <thead>
              <tr>
                <th>No</th>
                <th>Activity</th>
              </tr>
            </thead>
            {todoLists}
          </table>
        </form>
      );

 

  return (
    <div className="App">
      <header className="App-header">
        <h1 id="title" className="title">List The Thing <br /> You Want To Do Below</h1>
        {showClickMeButton ? (<div></div>) : todoForm}
      </header>
    </div>
  );
}

function TodoItem(props) {
  return (
      <tr>
          <td>{props.id}</td>
          <td>{props.value}</td>
      </tr>
  );
}

function ListTodo(props) {
  const todos = props.todos;
  const listTodos = todos.map(item => 
      <TodoItem key={item.id}
                id={item.id}
                value={item.activity} />
  );
  return <tbody>{listTodos}</tbody>;
}

export default App;
