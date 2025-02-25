import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {

  const [ToDo, setToDo] = useState("")
  const [ToDos, setToDos] = useState([])

  useEffect(() => {
    let ToDoString = localStorage.getItem("ToDos")
    if(ToDoString){
      let ToDos = JSON.parse(localStorage.getItem("ToDos"))
      setToDos(ToDos)
    }
  }, [])

  const saveToLocalStorage = (params) => {
    localStorage.setItem("ToDos", JSON.stringify(ToDos))
  }

  const handleAdd = () => {
    setToDos([...ToDos, { id: uuidv4(), ToDo, isCompleted: false }])
    setToDo("")
    saveToLocalStorage()
  }

  const handleEdit = (e, id) => {
    let t = ToDos.filter(i => i.id === id)
    setToDo(t[0].ToDo)
    let newToDos = ToDos.filter(item=>{
      return item.id !== id
    })
    setToDos(newToDos)
    saveToLocalStorage()
  }

  const handleDelete = (e, id) => {
    let newToDos = ToDos.filter(item=>{
      return item.id !== id
    })
    setToDos(newToDos)
    saveToLocalStorage()
  }
  
  const handleChange = (e) => {
    setToDo(e.target.value)
  }

  const handleCheckBox = (e) => {
    let id = e.target.name
    let index = ToDos.findIndex(item=>{
      return item.id === id;
    })
    let newToDos = [...ToDos]
    newToDos[index].isCompleted = !newToDos[index].isCompleted
    setToDos(newToDos)
    saveToLocalStorage()
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="container bg-violet-400  min-h-[80vh] sm:w-[60%] w-[90%] my-7 p-4 mx-auto rounded-2xl">
        <div className='addToDo '>
          <span className='text-2xl font-bold'>Add A Todo :</span>
          <div className='m-2 sm:flex justify-center gap-4'>
            <input onChange={handleChange} value={ToDo} type="text" className='bg-amber-50 p-2 w-[100%] sm:w-2xl rounded-xl' /> 
            <button onClick={handleAdd} disabled={ToDo.length<3} className='bg-blue-950 text-white p-2 rounded-xl font-bold w-[100%] sm:w-auto mt-3 sm:mt-0'>Add Todo</button>
          </div>

        </div>

        <div className='yourToDo'>
          <span className='text-2xl font-bold'>Your ToDo :</span>
          {ToDos.length === 0 && <div className='font-bold m-5'>-- No ToDos To Display</div>}
          {ToDos.map(item => {

            return <div key={item.id} className='m-2 flex justify-between gap-6'>
                <div className='check content-center'><input name={item.id} onChange={handleCheckBox} checked={item.isCompleted} type="checkbox" className='w-5 h-5'/></div>
                <div className={item.isCompleted ? "line-through" : ""}>{item.ToDo}</div>
                <div className='btn gap-4 h-10 flex items-center justify-center'>
                    <button onClick={(e)=>{handleEdit(e, item.id)}} className='bg-blue-950 text-white p-2 rounded-xl font-bold'><FaEdit /></button>
                    <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-blue-950 text-white p-2 rounded-xl font-bold'><MdDelete />
                    </button>
                </div>
            </div>

          })}
        </div>
      </div>
    </>
  )
}

export default App
