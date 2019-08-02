import * as actionTypes from 'store/actions/actionTypes';
import * as URL from 'assets/urls.js'
import axios from 'axios';


export const setLogIn = (isLoggedIn, userLvl) => {
    return {
        type: actionTypes.LOG_IN,
        isLoggedIn: isLoggedIn,
        userLvl: userLvl,
    }
}

export const updateForm = (form, field, value) => {
    return {
        type: actionTypes.UDPATE_FORM,
        form: form,
        field: field,
        value: value
    }
}

export const setForm = (form, formData, toSetValues = []) => {
    return {
        type: actionTypes.SET_FORM,
        form: form,
        toSetValues: toSetValues,
        formData: formData
    }
}

const convertDateFormat = events => {
    const formatedEvents = events.map((event) => {
        const newEvent = { ...event };
        newEvent.TreatmentDate = new Date(newEvent.TreatmentDate)
        // newEvent.TreatmentDate = new Date(newEvent.TreatmentDate.slice(0, -5))
        newEvent.EndDate = new Date(newEvent.EndDate)
        // newEvent.EndDate = new Date(newEvent.EndDate.slice(0, -5))
        return newEvent
    })
    return formatedEvents
}

export const updateCalendar = () => {
    return (dispatch) => {
        axios.get(URL.reservations)
            .then(res => {
                if (res.data) {
                    const calendarData = convertDateFormat(res.data)
                    dispatch({
                        type: actionTypes.UPDATE_CALENDAR,
                        calendarData: calendarData
                    })
                }
            })
    }
}

export const updateTable = (table, id, field, value) => {
    return {
        type: actionTypes.UPDATE_TABLE,
        table: table,
        id: id,
        field: field,
        value: value
    }
}

export const setTable = (table, tableData) => {
    return {
        type: actionTypes.SET_TABLE,
        table: table,
        tableData: tableData
    }
}

export const setFrefreshTreatmentTable = (fn) => {
    return {
        type: actionTypes.SET_REFRESH_TREATMENT_TABLE,
        fn: fn
    }
}

