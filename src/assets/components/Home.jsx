import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [todos, setTodos] = useState([]);//store in todos
  const [newTodo, setNewTodo] = useState("");//temprory value hold
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

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
  };

  const handleEditSave = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === editIndex ? editText : todo
    );
    setTodos(updatedTodos);
    setEditIndex(null);
    setEditText("");
  };

  const handleDelete = (index) => {
    const updatedTodos = todos.slice(); 
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };
  
  return (
    <div className='container mx-auto py-4'>
      <h1 className='text-center text-2xl/10 font-extrabold h-10 underline'>
        To do list- for your daily task manager
      </h1>
      <div className='container flex justify-evenly py-4 gap-2 min-w-auto '>
        <button 
          className='bg-black text-white h-10 font-bold p-3 py-2'
          onClick={openModal}
        >
          Create New 
        </button>
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
      <div className="container bg-blue-400 text-blue-800 p-4 mt-4">
        <h2 className='text-lg font-semibold underline'>Your To-do:</h2> 
        <div className="todos py-2">
          {todos.map((todo, index) => (
            <div className="todo flex py-2" key={index}>  
              <div className="text flex items-center">
                {editIndex === index ? (
                  <input
                    className="bg-blue-400 mr-2 p-1"
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                ) : (
                  <input
                    className="bg-blue-400 mr-2 p-1"
                    type="text"
                    value={todo}
                    readOnly
                  />
                )}
                <div className="buttons space-x-3">
                  {editIndex === index ? (
                    <button onClick={handleEditSave}><i className="fa-solid fa-save"></i></button>
                  ) : (
                    <button onClick={() => handleEdit(index)}><i className="fa-solid fa-pen-to-square"></i></button>
                  )}
                  <button onClick={() => handleDelete(index)}><i className="fa-solid fa-trash-can"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
