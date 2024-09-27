import React, { useContext, useState } from 'react'
import { appContext } from '../context/AppContext'

export const Nav = () => {

    //Context States
    const {isCreate, setIsCreate} = useContext(appContext);

    //Change Create State
    const ToggleCreate = () => {
        setIsCreate(prev => !prev);
    }

    return (
        <div>
            <nav className="bg-gradient-to-r from-indigo-400 from-10% via-indigo-300 via-30% to-white to-90% rounded">
                <ul className="flex justify-end py-4 ">
                    <li className="mx-4">
                        <button className='bg-[#5F33E1] p-2 w-32 rounded text-white' onClick={ToggleCreate}>New Task</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
