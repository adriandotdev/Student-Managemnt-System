import React, { useState, useContext } from 'react'
import Modal from '../components/Modal'

import { StudentContext } from '../context/StudentContext'

function StudentList() {
    
  const [isModalOpen, setModalOpen] = useState(false);
  const { students } = useContext(StudentContext);

  return (
    <>
      <header className="bg-gray-900 px-4 py-3 flex items-center gap-4 flex-wrap-reverse">
          <button 
                className="btn--primary" 
                onClick={() => setModalOpen(true)}>
                    New
            </button>
            <h1 className="h1--secondary">Student Management System</h1>
      </header>
      <main>
            <header className="flex items-center gap-5">
                <h1 className="h1--primary">Enrolled Students</h1>

                <button className="btn--primary-action">Delete</button>
                <button className="btn--primary-action">Edit Info</button>
            </header>
            { students.length > 0 ? <table className="w-full">
                <thead>
                    <th className="table--header"></th>
                    <th className="table--header">Given Name</th>
                    <th className="table--header">Middle Name</th>
                    <th className="table--header">Last Name</th>
                    <th className="table--header">Year Level</th>
                    <th className="table--header">School</th>
                    <th className="table--header">Course</th>
                </thead>
                {
                students.map(student => {

                    return (
                    <tr>
                        <td><input className="checked:bg-black" type="checkbox" name="" id="" /></td>
                        <td>{student.givenName}</td>
                        <td>{student.middleName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.yearLevel}</td>
                        <td>{student.school}</td>
                        <td>{student.course}</td>
                    </tr>
                    )
                })
                }
            </table> : <h1 className="h1--primary">No Enrolled Students</h1>}
            
        </main>
        {isModalOpen && <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen}/> }
    </>
  )
}

export default StudentList