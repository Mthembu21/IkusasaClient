import React, { useContext, useEffect, useState } from 'react'
import Task from '../components/Task'
import { appContext } from '../context/AppContext'
import TaskForm from '../components/TaskForm';
import EditTask from '../components/EditTask';

const Dashboard = () => {

    //API Url
    const apiUrl = "http://localhost:3000/tasks";

    //States for task data
    const [data, setData] = useState(null);

    //Fetcing Data
    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    //Fetch task data from DB
    useEffect(() => {
        fetchData();
    }, []);

    //States from Context
    const { isCreate, setIsCreate, isEdit } = useContext(appContext);

    //Itterate through tasks
    const taskData = data?.map((task) => (
        <Task key={task._id} title={task.title} description={task.description} dueDate={task.due_date} id={task._id} />
    ));

    const dueTodayTasks = data?.filter((task) => {
        const taskDate = new Date(task.due_date);
        const today = new Date();
        return !task.completed && taskDate.getDate() === today.getDate() && taskDate.getMonth() === today.getMonth() && taskDate.getFullYear() === today.getFullYear();
      });

      const notDueTodayTasks = data?.filter((task) => {
        const taskDate = new Date(task.due_date);
        const today = new Date();
        return !task.completed && taskDate > today;
      });

    const completedTasks = data?.filter((task) => task.completed);

    return (
        <div className=' flex flex-col md:flex-row md:space-x-10'>
            {isCreate ? <TaskForm /> : ""}
            {isEdit ? <EditTask /> : ""}
            {data ? (
                <div className='mt-4 w-full'>
                    <h2 className='text-xl font-bold'>Today's Tasks</h2>
                    <div className='w-full'>
                        {dueTodayTasks.map((task) => (
                            <Task key={task._id} title={task.title} description={task.description} dueDate={task.due_date} id={task._id} />
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading tasks...</p>
            )}

            {data ? (
                <div className='mt-4 w-full'>
                    <h2 className='text-xl font-bold'>Upcoming Tasks</h2>
                    <div className='w-full'>
                        {notDueTodayTasks.map((task) => (
                            <Task key={task._id} title={task.title} description={task.description} dueDate={task.due_date} id={task._id} />
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading tasks...</p>
            )}

            {data ? (
                <div className='mt-4 w-full'>
                    <h2 className='text-xl font-bold'>Completed Tasks</h2>
                    <div className='w-full'>
                        {completedTasks.map((task) => (
                            <Task key={task._id} title={task.title} description={task.description} dueDate={task.due_date} id={task._id} />
                        ))}
                    </div>
                </div>
            ) : (
                <p className="text-center">Loading tasks...</p>
            )}
        </div>
    )
}

export default Dashboard