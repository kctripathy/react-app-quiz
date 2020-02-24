import { API_URL } from '../../config';
import { DEFAULT_ACCOUNT_ID } from '../../config';


//=====================================================================
export const getAllClassSubjectsByAccountId = (accountId) => {
    const url = `${API_URL}/ClassesSubjects/all/${accountId}`;
    console.log("url=", url);
    return fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
};

//=====================================================================
export const getAvailbleClassSubjectsByAccountId = (accountId) => {
    const url = `${API_URL}/classessubjects/QuestionsAvailable/${accountId}`;
    //console.log("url=", url);
    return fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
};

//=====================================================================
export const removeDuplicates = (sourceArray, fieldName) => {

    // Declare a new array 
    let newArray = [];

    // Declare an empty object 
    let uniqueObject = {};

    // Loop for the array elements 
    for (let i in sourceArray) {

        // Extract the fieldName 
        let objClassID = sourceArray[i][fieldName];

        // Use the fieldName as the index 
        uniqueObject[objClassID] = sourceArray[i];
    }

    // Loop to push unique object into array 
    for (let i in uniqueObject) {
        newArray.push(uniqueObject[i]);
    }

    return newArray;
}


//=====================================================================
export const getSubjectsByClassID = (sourceArray, classID) => {
    // Declare a new array 
    let newArray = [];
    //debugger;
    // Loop for the array elements 
    for (let i in sourceArray) {

        if (sourceArray[i]["classID"].toString() === classID.toString()) {
            newArray.push(sourceArray[i]);
        }

    }
    return newArray;
}

//=====================================================================
export const getSubjectsByClassSubjectID = (sourceArray, classSubjectID) => {
    // Declare a new array 
    let newArray = [];
    debugger;
    // Loop for the array elements 
    for (let i in sourceArray) {

        if (sourceArray[i]["classSubjectID"].toString() === classSubjectID.toString()) {
            newArray.push(sourceArray[i]);
        }

    }
    return newArray;
}

//=====================================================================
export const getClassSubjectByID = (sourceArray, classSubjectID) => {
    // Declare a new array 
    let newArray = [];
    //debugger;
    // Loop for the array elements 
    for (let i in sourceArray) {

        if (sourceArray[i]["classSubjectID"].toString() === classSubjectID.toString()) {
            newArray.push(sourceArray[i]);
        }

    }
    return newArray;
}

//=====================================================================
export const addQuestion = (question) => {

    return fetch(`${API_URL}/questions/add`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

//=====================================================================
export const updateQuestion = (question) => {

    return fetch(`${API_URL}/questions/update`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })
}

//=====================================================================
export const getQuestions = (classSubjectId, accountId) => {
    let url = `${API_URL}/questions/${classSubjectId}/${accountId}`;
    return fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })

}
//=====================================================================
export const getAllQuestionsByAccountId = (accountId) => {
    let url = `${API_URL}/questions/all/${accountId}`;
    return fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })

}

export const getQuestionById = (qId) => {
    let url = `${API_URL}/questions/getbyid/${qId}`;
    return fetch(url, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => {
            console.log(err)
        })

}
