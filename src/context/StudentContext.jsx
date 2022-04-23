import React, { useReducer } from 'react'
import addStudentModalReducers from '../reducers/addStudentModalReducers';
import studentReducers from '../reducers/studentReducers';

const StudentContext = React.createContext(null);

function StudentContextProvider({ children }) {

   const [students, addStudents] = useReducer(studentReducers, [])
  const [state, dispatch] = useReducer(addStudentModalReducers, {
    givenName: "",
    middleName: "",
    lastName: "",
    school: "",
    course: "BS Computer Science",
    yearLevel: "1st Year"
  });

  return (
    <StudentContext.Provider value={{state, dispatch, students, addStudents}}>
        { children }
    </StudentContext.Provider>
  )
}

export { StudentContextProvider, StudentContext }