function addStudentModalReducers(state, action) {

    switch (action.type) {

        case "givenName": 
            return { ...state, givenName: action.payload }
        case "middleName":
            return { ...state, middleName: action.payload }
        case "lastName":
            return { ...state, lastName: action.payload }
        case "school":
            return { ...state, school: action.payload }
        case "yearLevel":
            return { ...state, yearLevel: action.payload }
        case "course":
            return { ...state, course: action.payload }
        default: 
            return {
                givenName: "",
                middleName: "",
                lastName: "",
                school: "",
                yearLevel: "1st Year",
                course: "BS Computer Science",
            }
    }
}

export default addStudentModalReducers