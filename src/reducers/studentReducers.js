function studentReducers(state, action) {

    let newStudent = action.payload;

    if (action.type === "addStudent") {
        console.log(newStudent);
        fetch('http://localhost:5000/new-student', {
            body: JSON.stringify(action.payload),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((value) => {
            console.log("OKAY");
            return state;
        });
    }
    // switch (action.type) {

    //     case 'addStudent':
            
    //         break;
    //         // return [
    //         //     ...state, 
    //         //     {
    //         //         givenName : newStudent.givenName,
    //         //         middleName : newStudent.middleName,
    //         //         lastName : newStudent.lastName,
    //         //         yearLevel: newStudent.yearLevel,
    //         //         school: newStudent.school,
    //         //         course: newStudent.course,
    //         //     }
    //         // ]
    // }

    return state;
}

export default studentReducers