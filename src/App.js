import React, {useState, useEffect} from "react";
import "./App.css";
export default function App() {
 const [msg, toggleMsg] = useState(true);
 var [newtodo, addNewTodo] = useState("");
 // Predefined todos
 const [todos, todoList] = useState([
  {id: 789, text: "Take Gwen for a date", done: false},
  {id: 456, text: "Buy eggs for Aunt may", done: false},
  {id: 123, text: "Make a todo list", done: true},
 ]);

 // Handle Form Submit aka Add New Item
 const handleSubmit = (e) => {
  e.preventDefault(); //Prevent Page refresh
  if (newtodo === "") return;
  todoList([{id: Date.now(), text: newtodo, done: false}, ...todos]);
  /* Clear Input fields */
  e.target.reset();
  addNewTodo("");
 };

 // Display Empty Message
 const handleMsg = () => {
  todos.length > 0 ? toggleMsg(false) : toggleMsg(true);
 };
 useEffect(() => handleMsg(), [todos]);

 return (
  <form onSubmit={handleSubmit}>
   <fieldset className="App">
    <legend>
     <span className="rd"></span>
     <span className="yl"></span>
     <span className="gn"></span>
    </legend>
    <input
     placeholder="Type here"
     type="text"
     onChange={(e) => {
      addNewTodo(e.target.value);
     }}
    />

    <input type="submit" value="ADD" onSubmit={handleSubmit} />
    <div className="list">
     <ul>
      {/* Display todo */}
      {todos.map((item) => (
       <li
        className={item.done ? "done" : "left"}
        key={item.id}
        onClick={() => {
         item.done ? (item.done = false) : (item.done = true);
         todoList([...todos]);
        }}
       >
        <span
         onClick={(e) => {
          e.stopPropagation();
          todoList(todos.filter((todos) => todos.id !== item.id));
         }}
        >
         X
        </span>
        {item.text}
       </li>
      ))}
     </ul>
     {msg ? <div id="msg">looks empty :( You can fix that!</div> : null}
    </div>
   </fieldset>
  </form>
 );
}
