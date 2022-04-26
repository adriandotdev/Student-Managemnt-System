import React, { useState, useReducer } from 'react'
import addStudentModalReducers from '../reducers/addStudentModalReducers';
import studentReducers from '../reducers/studentReducers';

const StudentContext = React.createContext(null);

function StudentContextProvider({ children }) {

  const [students, setStudents] = useState([]);
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
    <StudentContext.Provider value={{state, dispatch, students, setStudents}}>
        { children }
    </StudentContext.Provider>
  )
}

export { StudentContextProvider, StudentContext }