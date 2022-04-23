import React, {useContext} from 'react'
import { StudentContext } from '../context/StudentContext'

function InputSection({ label, labelFor, type, value, additionalClassName }) {

  const { dispatch } = useContext(StudentContext);

  return (
    <>
    <section className={"form--section" +  " " + additionalClassName}>
          <label className="section--label" htmlFor={labelFor}> {label} </label>
          <input 
            value={value} 
            onChange={(e) => { 
              dispatch({type: type, payload: e.target.value})
            }}
            className="section--text-input" 
            type="text" 
            name={labelFor} 
            id={labelFor} 
            required/>
        </section>
    </>
  )
}

export default InputSection