import React, { useState, useContext, useEffect } from 'react'
import Modal from '../components/Modal'
import { motion, AnimatePresence } from 'framer-motion'
import { StudentContext } from '../context/StudentContext'
import {AiFillEdit} from 'react-icons/ai'
import {AiFillDelete} from 'react-icons/ai'
import ConfirmModal from '../components/ConfirmModal'

function StudentList() {
    
  const [isModalOpen, setModalOpen] = useState(false);
  const { students, setStudents, fetchData, toBeDeleted, setToBeDeleted, isCheckingToUpdateOrDelete, setCheckingToUpdateOrDelete, setConfirmModalOpen} = useContext(StudentContext);
  const [checkAll, setCheckAll] = useState(false);
  const [isModifying, setModifying] = useState(false);
  const [isUpdating, setUpdating] = useState(false);

  const btnActionVariants = {
      initial: {
          opacity: 0
      },
      animate: {
          opacity: 1,
          transition: {
            beforeChildren: true,
            staggerChildren: .01
          }
      },
      exit: {
          opacity: 0,
          transition: {
              beforeChildren: true,
              staggerChildren: .01
          }
      }
  }

  const countItemToBeEdited = () => {

    let count = 0;

    students.forEach(stud => { 
        
        if (stud.isChecked)
            count++;
    });

    return count;
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

        getStudents();
        setCheckAll(false);
    }, [fetchData])
    
    useEffect(() => {

        if (countItemToBeEdited() > 0) {

            setModifying(true);
            setUpdating(true);

            if (countItemToBeEdited() > 1) {
                setUpdating(false);
            }
        }
        else {
            setModifying(false);
            setUpdating(false);
        }
    }, [students])

    useEffect(() => {

        let toDelete = []

        students.forEach(stud => {

            if (stud.isChecked)
                toDelete.push(stud.id);
        })

        setToBeDeleted(toDelete);

    }, [isCheckingToUpdateOrDelete])
    
  return (
    <>
      <header className="bg-gray-900 px-4 py-3 flex items-center gap-4 flex-wrap-reverse">
            <button 
                className="btn--primary rounded-full" 
                onClick={() => setModalOpen(true)}>
                    New
            </button>
            <h1 className="h1--secondary">Student Management System</h1>
      </header>
      <main>
            <header className="flex flex-wrap items-center gap-4">

                <h1 className="h1--primary">
                    {students.length > 0 ? "Enrolled Students" 
                        : "No Enrolled Students"}
                </h1>

                <AnimatePresence>
                    { isModifying && <motion.section
                        variants={btnActionVariants} 
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="flex items-center gap-2">

                        <motion.button 
                            onClick={() => setConfirmModalOpen(true)}
                            variants={btnActionVariants}
                            className="btn--primary-action btn--danger flex items-center gap-1">
                            <AiFillDelete />
                            Delete
                        </motion.button>

                        { isUpdating && isModifying && <motion.button 
                            variants={btnActionVariants}
                            className="btn--primary-action btn--modify flex items-center gap-1">
                            <AiFillEdit />
                            Edit Info
                        </motion.button> }
                    </motion.section> }
                </AnimatePresence>
                
            </header>

            { students && 
            <table className="w-full sm:max-w-full overflow-x-scroll">
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
                                setCheckingToUpdateOrDelete(prev => !prev);
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
                                        
                                        setCheckAll(false);
                                        
                                        let array = students.map(stud => {
                                            if (student.id == stud.id)
                                                return { ...stud, isChecked: !stud.isChecked, id: stud.id }

                                            return { ...stud, id: stud.id }
                                        });
                                        
                                        setStudents(array);
                                        setCheckingToUpdateOrDelete(prev => !prev)
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
        <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen}/> 
        <ConfirmModal/>
    </>
  )
}

export default StudentList