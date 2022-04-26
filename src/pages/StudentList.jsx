import React, { useState, useContext, useEffect } from 'react'
import Modal from '../components/Modal'
import { motion, AnimatePresence } from 'framer-motion'
import { StudentContext } from '../context/StudentContext'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'

function StudentList() {
    

  const [isModalOpen, setModalOpen] = useState(false);
  const { students, setStudents } = useContext(StudentContext);
  const [checkAll, setCheckAll] = useState(false);
  const [isModifying, setModifying] = useState(false);
  

  const btnActionVariants = {
      initial: {
          opacity: 0
      },
      animate: {
          opacity: 1,
          transition: {
            beforeChildren: true,
            staggerChildren: .1
          }
      },
      exit: {
          opacity: 0,
          transition: {
              beforeChildren: true,
              staggerChildren: .1
          }
      }
  }

  const getStudents = () => {
    fetch('http://localhost:5000/students')
        .then((res) => res.json())
        .then(value => {

            const modifiedList = JSON.parse(value).map(student => {
                return {...student, isChecked: false}
            })

            setStudents(modifiedList)
        });
    }

    useEffect(() => {
        console.log("RUNNING");
        getStudents();
    }, [])
    
    useEffect(() => {

        console.log("CHECK ALL RUN");
    }, [checkAll])
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
            <header className="flex flex-wrap items-center gap-2">

                <h1 className="h1--primary">
                    {students.length > 0 ? "Enrolled Students" 
                        : "No Enrolled Students"}
                </h1>

                <AnimatePresence>
                    {isModifying && <motion.section
                        variants={btnActionVariants} 
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex items-center gap-2">

                        <motion.button 
                            variants={btnActionVariants}
                            className="btn--primary-action flex items-center gap-1">
                            <AiFillDelete />
                            Delete
                        </motion.button>
                        <motion.button 
                            variants={btnActionVariants}
                            className="btn--primary-action flex items-center gap-1">
                            <AiFillEdit />
                            Edit Info
                        </motion.button>
                    </motion.section> }
                </AnimatePresence>
                
            </header>

            { students && 
            <table className="w-full">
                <thead>
                    <th className="table--header">
                        <input 
                            value={checkAll} 
                            checked={checkAll} 
                            onChange={() => { 
                                setCheckAll(!checkAll);
                                
                                let newArr = students.map(stud => {
                                    return {...stud, id: stud.id, isChecked: !checkAll}
                                });
                                setStudents(newArr);
                            }} 
                            type="checkbox" name="" id="" />
                    </th>
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
                        <tr key={student.id}>
                            <td>
                                <input 
                                    onChange={(e) => {
                                        
                                        setCheckAll(false)

                                        let array = students.map(stud => {
                                            if (student.id == stud.id)
                                                return { ...stud, isChecked: !stud.isChecked, id: stud.id }

                                            return { ...stud, id: stud.id }
                                        })
                                        
                                        setStudents(array)
                                        
                                    }}
                                    value={student.isChecked}
                                    checked={student.isChecked}
                                    className="" type="checkbox"/>
                            </td>
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
            </table> }
        </main>
        {isModalOpen && <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen}/> }
    </>
  )
}

export default StudentList