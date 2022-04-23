function studentReducers(state, action) {

    let newStudent = action.payload;

    switch (action.type) {

        case 'addStudent':
            return [
                ...state, 
                {
                    givenName : newStudent.givenName,
                    middleName : newStudent.middleName,
                    lastName : newStudent.lastName,
                    yearLevel: newStudent.yearLevel,
                    school: newStudent.school,
                    course: newStudent.course,
                }
            ]
    }

    return state;
}

export default studentReducers