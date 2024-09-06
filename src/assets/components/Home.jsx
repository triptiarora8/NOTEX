import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todos, setTodos] = useState(()=>{
    const  savedTodos = localStorage.getItem('todos');
    return savedTodos? JSON.parse(savedTodos):[];
  });//store in todos
  const [newTodo, setNewTodo] = useState("");//temprory value hold
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertIndex, setAlertIndex] = useState(null);
   
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos]);


  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openEditModal=() =>setEditModalIsOpen(true);
  const closeEditModal=() =>setEditModalIsOpen(false);

  const handleSave = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, newTodo]);
      setNewTodo("");
      closeModal();
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditText(todos[index]);
    openEditModal();
  };

  const handleEditSave = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === editIndex ? editText : todo
    );
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText("");
    closeEditModal();
  };

  const handleDelete = (index) => {
    setAlertMessage(`Are You Sure you want to delete: "${todos[index]}"?`);
    setAlertIndex(index);
  };
  const confirmDelete = ()=>{
    const updatedTodos = todos.slice(); 
    const deleteTodo = updatedTodos.splice(alertIndex, 1)[0];
    setTodos(updatedTodos);
    setAlertMessage(`Deleted:"${deleteTodo}"`);
    setTimeout(()=>{
      setAlertMessage("");
      setAlertIndex(null);
    }, 2000);
  }
  
  const cancelDelete = ()=>{
    setAlertMessage("");
    setAlertIndex(null);
  }
  const filteredTodos = todos.filter(todo => 
    todo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleKeyDown =(e)=>{
    if(e.key === "Enter"){
      handleSave();
    }
  }
  return (
    <div className='container mx-auto py-4 min-h-screen'>
      <h1 className='text-center text-2xl/10 font-extrabold h-10 underline'>
      To do list- for your daily task manager
      </h1>
      {alertMessage && (
        <div className='bg-red-400 text-white text-center py-2'>
          {alertMessage}
          <div className='flex justify-center mt-2'>
            <button className='bg-red-700 text-white py-1 px-4 mx-2' onClick={confirmDelete}>
              Confirm
            </button>
            <button className="bg-gray-700 text-white py-1 px-4 mx-2" onClick={cancelDelete}>
              Cancel
            </button>
          </div>
        </div>
      )}
      <div className='container flex justify-evenly py-4 gap-2 min-w-auto '>
        <button 
          className='bg-black text-white h-10 font-bold p-3 py-2'
          onClick={openModal}
        >
          Create New 
        </button>
        <input type="text" placeholder='Search' className='bg-gray-500 p-2 rounded' value={searchQuery}
        onChange={(e)=> setSearchQuery(e.target.value)}/>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create New Note"
        className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className='bg-white p-6 rounded-lg shadow-lg w-1/2'>
          <div className="flex justify-center mt-4">
            <textarea
              className='bg-blue-300 h-60 w-full'
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={handleKeyDown}
            ></textarea>
          </div>
          <div className='flex justify-end w-full py-2 gap-4 mt-4'>
            <button className='bg-gray-700 text-white py-2 px-4' onClick={handleSave}>
              Save 
            </button>
            <button className='bg-gray-700 text-white py-2 px-4' onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        isOpen={editModalIsOpen}
        onRequestClose={closeEditModal}
        contentLabel="Edit Note"
        className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className='bg-white p-6 rounded-lg shadow-lg w-1/2'>
          <div className="flex justify-center mt-4">
            <textarea
              className='bg-blue-300 h-60 w-full'
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
            ></textarea>
          </div>
          <div className='flex justify-end w-full py-2 gap-4 mt-4'>
            <button className='bg-gray-700 text-white py-2 px-4' onClick={handleEditSave}>
              Save 
            </button>
            <button className='bg-gray-700 text-white py-2 px-4' onClick={closeEditModal}>
              Close
            </button>
          </div>
        </div>
      </Modal>
      <div className="flex justify-center h-1/2">
      <div className="container bg-blue-400 text-blue-800 p-4 mt-4 w-full md:w-1/2 overflow-y-auto">
        <h2 className='text-lg font-semibold '>
        <i class="fa-solid fa-house"></i> Tasks:
          </h2> 
        <div className="todos py-2">
          {filteredTodos.map((todo, index) => (
            <div className="todo flex py-2" key={index}>  
              <div className="text flex items-center">
                  <input
                    className="bg-blue-400 mr-2 p-1"
                    type="text"
                    value={todo}
                    readOnly
                  />
                
                <div className="buttons space-x-3">
                    <button onClick={() => handleEdit(index)}><i className="fa-solid fa-pen-to-square"></i></button>
                  
                  <button onClick={() => handleDelete(index)}><i className="fa-solid fa-trash-can"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
