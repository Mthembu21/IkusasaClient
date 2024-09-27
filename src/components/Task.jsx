import React, { useContext } from 'react'
import { appContext } from '../context/AppContext'

function Task(props) {

    //Context States
    const { taskId, setTaskId, isEdit, setIsEdit } = useContext(appContext);

    //Handle Edit
    const ShowEdit = () => {
        setTaskId(props.id);
        setIsEdit(prev => !prev);
    }

    //Delete task
    const deleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Error deleting task');
            }

            console.log('Task deleted successfully');

            // Update your task list or perform other actions as needed
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md my-2">
            <h3 className="text-lg font-bold">{props.title}</h3>
            <p className="text-gray-500 my-2">{props.description}</p>
            <p className="text-gray-500 mb-2">{props.dueDate}</p>
            <button className="bg-[#EDE8FF] p-2 w-24 rounded text-[#5F33E1] hover:bg-[#5F33E1] hover:text-white" onClick={() => deleteTask(props.id)}>
                Delete
            </button>
            <button className="bg-[#5F33E1] p-2 w-24 rounded text-white ml-2 hover:bg-[#EDE8FF] hover:text-[#5F33E1]" onClick={() => { setTaskId(props.id); setIsEdit(prev => !prev) }}>
                Edit
            </button>
        </div>
    )
}

export default Task