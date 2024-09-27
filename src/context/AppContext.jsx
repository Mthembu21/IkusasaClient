import React, { createContext, useState } from "react";

export const appContext = createContext();

const AppContextProvider = (props) => {

    //Show Add Task
    const [isCreate, setIsCreate] = useState(false);
  
    //Edit Tsk ID
    const [taskId, setTaskId] = useState("");

    //Show Add Task
    const [isEdit, setIsEdit] = useState(false);

    return (
      <appContext.Provider value={{
        isCreate, setIsCreate,
        taskId, setTaskId,
        isEdit, setIsEdit
      }}>
        {props.children}
      </appContext.Provider>
    )
  }
  
  export default AppContextProvider;         