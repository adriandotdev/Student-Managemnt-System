import React, { useState, useReducer } from 'react'
import addStudentModalReducers from '../reducers/addStudentModalReducers';
import studentReducers from '../reducers/studentReducers';

const StudentContext = React.createContext(null);

function StudentContextProvider({ children }) {

  const [students, setStudents] = useState([]);
  const [fetchData, setFetchData] = useState(false);

  const [isCheckingToUpdateOrDelete, setCheckingToUpdateOrDelete] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState([]);

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  const [state, dispatch] = useReducer(addStudentModalReducers, {
    isChecked: true,
    givenName: "",
    middleName: "",
    lastName: "",
    school: "",
    course: "BS Computer Science",
    yearLevel: "1st Year"
  });

  return (
    <StudentContext.Provider value={{state, dispatch, students, setStudents, fetchData, setFetchData, toBeDeleted, setToBeDeleted, isCheckingToUpdateOrDelete, setCheckingToUpdateOrDelete, confirmModalOpen, setConfirmModalOpen}}>
        { children }
    </StudentContext.Provider>
  )
}

export { StudentContextProvider, StudentContext }