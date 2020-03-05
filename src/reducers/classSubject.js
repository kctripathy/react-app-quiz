


export const initialState = {
    classSubjects: [],
    loading: true,
    error: '',
    success: ''
};

const classSubjectReducer = (state, action) => {
    //debugger;
    switch (action.type) {
        case 'fetchingApi':
            return (
                {
                    ...state,
                    classSubjects: [],
                    loading: true,
                    error: ''
                }
            )
            break;
        case 'fetchApiSuccess':
            return (
                {
                    ...state,
                    classSubjects: action.payload,
                    loading: false,
                    error: ''
                }
            )
            break;
        case 'fetchApiFailure':
            return (
                {
                    ...state,
                    classSubjects: [],
                    loading: false,
                    error: action.payload
                }
            )
            break;
        default:
            return state;
            break;
    }
}

export default classSubjectReducer;