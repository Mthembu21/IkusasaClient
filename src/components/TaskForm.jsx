import React, { useContext, useState } from 'react'
import { appContext } from '../context/AppContext';

const TaskForm = () => {

    //Context States
    const { setIsCreate } = useContext(appContext);

    //FORM States
    const [taskForm, setTaskForm] = useState({ title: "", description: "", due_date: "" });

    //Change Create State
    const ToggleCreate = () => {
        setIsCreate(prev => !prev);
    }

    //Submitting task car form
    const submitTasklForm = (e) => {
        e.preventDefault();
        console.log(taskForm);
        fetch("http://localhost:3000/tasks", {
            method: "POST",
            body: JSON.stringify(taskForm),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json",
                "content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                // Reload the page after successful submission
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error submitting task:", error);
            });
    };

    //Handling from data change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskForm((prevForm) => ({
            ...prevForm,
            [name]: value
        }));
    };

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center h-screen w-screen bg-gray-200 bg-opacity-50'>
            <div className="mt-4 w-72 md:w-2/5 bg-white p-7 rounded-md">
                <input type="text" value={taskForm.title} name='title' onChange={handleChange} placeholder="Title" className="border p-3 block w-full rounded" />
                <textarea value={taskForm.description} name='description' onChange={handleChange} placeholder="Description" className="border p-3 rounded mt-3 block w-full" />
                <input type='date' value={taskForm.due_date} name='due_date' onChange={handleChange} className="border p-3 rounded mt-3  block w-full" />
                <div className='mt-3'>
                    <button className="bg-[#EDE8FF] p-2 w-24 rounded text-[#5F33E1] hover:bg-[#5F33E1] hover:text-white" onClick={submitTasklForm}>Add Task</button>
                    <button className="bg-[#5F33E1] p-2 w-24 rounded text-white ml-2 hover:bg-[#EDE8FF] hover:text-[#5F33E1]" onClick={ToggleCreate}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default TaskForm