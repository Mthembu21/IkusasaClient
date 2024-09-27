import React, { useContext, useState, useEffect } from 'react'
import { appContext } from '../context/AppContext';

const EditTask = () => {

    //Context States
    const { setIsCreate } = useContext(appContext);

    //FORM States
    const [taskForm, setTaskForm] = useState({ title: "", description: "", due_date: "", completed: false, priority: "medium" });

    //Context States
    const { taskId, setTaskId, setIsEdit } = useContext(appContext);

    //Fetch Current Task Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
                const data = await response.json();
                setTaskForm(data);
            } catch (error) {
                console.error('Error fetching task:', error);
            }
        };

        fetchData();
    }, [taskId]);

    //Change Create State
    const ToggleCreate = () => {
        setIsEdit(prev => !prev);
    }

    // Submitting task form
    const submitTasklForm = (e) => {
        e.preventDefault();
        console.log(taskForm);
        fetch(`http://localhost:3000/tasks/${taskId}`, {
            method: "PUT",
            body: JSON.stringify(taskForm),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Accept": "application/json",
                "content-type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((json) => { console.log(json); window.location.reload(); });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setTaskForm((prevForm) => ({
                ...prevForm,
                [name]: checked
            }));
        } else {
            setTaskForm((prevForm) => ({
                ...prevForm,
                [name]: value
            }));
        }
    };

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center h-screen w-screen bg-gray-200 bg-opacity-50'>
            <div className="mt-4 w-72 bg-white p-7 rounded-md md:w-2/5">
                <input type="text" value={taskForm.title} name='title' onChange={handleChange} placeholder="Title" className="border p-3 block w-full rounded" />
                <textarea value={taskForm.description} name='description' onChange={handleChange} placeholder="Description" className="border p-3 rounded mt-3 block w-full" />
                <input type='date' value={taskForm.due_date} name='due_date' onChange={handleChange} className="border p-3 rounded mt-3  block w-full" />
                <div className='mt-3 '>
                    <label>Completed?  </label>
                    <input type='checkbox' value={taskForm.completed} name='completed' onChange={handleChange} className="border p-2 mt-2 mr-2" />
                </div>

                <div className='mt-3'>
                    <button className="bg-[#EDE8FF] p-2 w-24 rounded text-[#5F33E1] hover:bg-[#5F33E1] hover:text-white" onClick={submitTasklForm}>Save</button>
                    <button className="bg-[#5F33E1] p-2 w-24 rounded text-white ml-2 hover:bg-[#EDE8FF] hover:text-[#5F33E1]" onClick={ToggleCreate}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditTask