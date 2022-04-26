import React, {useState, useReducer, useEffect, useContext} from 'react'
import {motion, AnimatePresence} from 'framer-motion'
import useBreakpoint from '../hooks/useBreakpoint'
import {StudentContext} from '../context/StudentContext'

// Components
import InputSection from '../components/InputSection'

function Modal({isModalOpen, setModalOpen}) {

  const { state, dispatch, setStudents, setFetchData } = useContext(StudentContext);
  let isMatch = useBreakpoint(640); // custom hook

  const [isFieldCompleted, setFieldCompleted] = useState(false);

  useEffect(() => {

    let isFilledUp = Object.values(state).every(value => String(value).trim().length > 0)
    setFieldCompleted(isFilledUp);

  }, [state]);

  const modalVariants = {

    initial: {
      y: isMatch ? '70%' : '-70%'
    },
    animate: {
      y: isMatch ?  '0%' : '0%'
    }, 
    exit: {
      y: isMatch ? '270%' : '-270%',
    }
  }


  const getStudents = () => {
    fetch('http://localhost:5000/students')
        .then((res) => res.json())
        .then(value => {
          setStudents(JSON.parse(value));
          setFetchData(prev => !prev);
        });
  }


  const newStudent = async () => {

    try {
      const res = await fetch('http://localhost:5000/new-student', {
          body: JSON.stringify(state),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
      })

      if (res) {
        getStudents();
        dispatch({ type: 'reset' });
      }
    }
    catch(_err) {
      console.log(_err);
    }
  }

  return (
    <>
    <AnimatePresence>
     {isModalOpen && <motion.div 
        key={isModalOpen}  
        onClick={(e) => { 
 
          setModalOpen(false)
        }} 
        className="fixed bottom-0 bg-gray-500 bg-opacity-50 w-screen h-full overflow-auto flex flex-col justify-end sm:justify-center sm:items-center">

        <motion.div 
            onClick={(e) => e.stopPropagation()}
            variants={modalVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="custom-xs:bottom w-full sm:h-max  sm:max-w-[35rem] bg-gray-100 border border-gray-200 shadow-md rounded-md p-4 flex flex-col gap-5">

            <h1 className="text-2xl font-bold text-gray-900">New Student</h1>

            <form 
              className="flex flex-col gap-1 sm:grid sm:grid-cols-3 sm:gap-2">

              <InputSection label="Given Name:" labelFor="givenName" type="givenName" value={state.givenName} />

              <InputSection label="Middle Name:" labelFor="middleName" type="middleName" value={state.middleName} />

              <InputSection label="Last Name:" labelFor="lastName" type="lastName" value={state.lastName} />

              <InputSection label="School:" labelFor="school" type="school" 
              value={state.school} additionalClassName="sm:row-start-2 sm:col-start-1 sm:col-end-4"/>

              <section className="form--section sm:col-start-1 sm:col-end-3">
                 <label className="section--label" htmlFor="course">Course</label>
                 <select 
                    value={state.course} 
                    onChange={(e) => {
                      dispatch({ type: 'course', payload: e.target.value })
                    }} 
                    className="section--select" name="course" id="course">
                    <option value="BS Computer Science">BS Computer Science</option>
                    <option value="BS Information Technology">BS Information Technology</option>
                    <option value="BS Hospitality and Management">BS Hospitality and Management</option>
                    <option value="BS Psychology">BS Psychology</option>
                  </select>
              </section>

              <section className="form--section">
                  <label className="section--label" htmlFor="year-level">Year Level:</label>
                  <select 
                    value={state.yearLevel} 
                    onChange={(e) => {
                      dispatch({ type: 'yearLevel', payload: e.target.value })
                    }} 
                    className="section--select" name="" id="year-level">
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                  </select>
              </section>
            </form>

            <button 
                onClick={
                  isFieldCompleted ? 
                  () => {
                    newStudent();
                  } : null} 
                  className="btn--primary w-full">
                Add
            </button>
        </motion.div>
    </motion.div> }
    </AnimatePresence>
    </>
  )
}

export default Modal