import React, {useContext} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {StudentContext} from '../context/StudentContext'

function ConfirmModal() {

  const { confirmModalOpen, setConfirmModalOpen, toBeDeleted, setFetchData } = useContext(StudentContext);

  const confirmModalVariant = {

    initial: {
        y: '-100%'
    },
    animate: {
        y: 0
    },
    exit: {
        y: '-270%',
        opacity: 0
    }
  }

  const deleteStudents = () => {

    fetch('http://localhost:5000/delete', {
        body: JSON.stringify(toBeDeleted),
        method: 'DELETE',
        headers: { 'Content-Type' : 'application/json'}
    }).then(_value => setFetchData(prev => !prev))
  }
  return (

    <AnimatePresence>
        {confirmModalOpen && 
        
        <div 
            onClick={(e) => {
                e.stopPropagation();

                setConfirmModalOpen(false);
            }}
            key={confirmModalOpen} 
            className="fixed top-0 h-full w-full bg-opacity-50 bg-gray-500 flex items-center justify-center">

            <motion.div 
                variants={confirmModalVariant}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-gray-100 max-w-[15rem] flex flex-col gap-4 p-4 rounded-md">
                
                <h1 className="font-semibold font-sans text-red-700">Are you sure you want to delete selected items?</h1>

                <section className="flex gap-3">
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();

                            setConfirmModalOpen(false);

                            setTimeout(deleteStudents, .5);
                        }}
                        className="bg-red-500 p-2 rounded-md font-semibold text-gray-200 hover:bg-red-600 transition-colors">
                            Confirm
                        </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();

                            setConfirmModalOpen(false);
                        }} 
                        className="font-semibold hover:bg-gray-200  p-2 rounded-md transition-colors">
                            Cancel
                    </button>
                </section>
            </motion.div>
        </div> }
    </AnimatePresence>
  )
}

export default ConfirmModal