import React from 'react'
import {StudentContextProvider} from './context/StudentContext'
import StudentList from './pages/StudentList'

function App() {

  return (
   <StudentContextProvider>
     <StudentList />
   </StudentContextProvider>
  )
}

export default App