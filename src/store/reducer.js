import * as actionTypes from 'store/actions/actionTypes';

const defaultValues = {
    customerForm: {
        FirstName: '',
        LastName: '',
        Birthday: '1999-03-22',
        Group: 1,
        PhoneNumber: '666',
        Email: 'dupa@gmail.com',
        Company: '',
        TaxNumber: '',
        PromotialInfoAgreement: false
    },
    calendarCustomer: {
        FirstName: '',
        LastName: '',
    },
    treatmentForm: {
        Description: '',
        TreatmentDate: new Date(),
        DurationInMinutes: '',
        OfficeID: '',
        IsTreatmentDone: false,
        IsTreatmentCancel: false,
        Cost: '',
        PaymentMethod: '',
        TreatmentUID: '',
        UserUID: '',
    }
}

const initState = {
    customerForm: { ...defaultValues.customerForm },
    treatmentForm: { ...defaultValues.treatmentForm },
    formsStateCopy: {},
    areFormsEdited: {},
    customerStats: {},
    calendarEvents: [],
    isLoggedIn: false,
    refreshTreatmentTable: null
}

const reducer = (state = { ...initState }, action) => {
    switch (action.type) {
        case actionTypes.UDPATE_FORM:
            {
                const newState = { ...state }
                const areFormsEdited = { ...newState.areFormsEdited }
                const isFormEdited = { ...areFormsEdited[action.form] }
                isFormEdited[action.field] = action.value !== state.formsStateCopy[action.form][action.field]
                areFormsEdited[action.form] = isFormEdited
                const isEdited = Object.values(isFormEdited).includes(true)

                newState[action.form] = {
                    ...newState[action.form],
                    [action.field]: action.value,
                    isEdited: isEdited
                }
                newState.areFormsEdited = areFormsEdited
                return newState
            }
        case actionTypes.SET_FORM:
            {
                const newState = { ...state, formsStateCopy: { ...state.formsStateCopy } }
                const newData = action.formData ? { ...action.formData } : defaultValues[action.form] ? { ...defaultValues[action.form] } : {}
                for (let toSet of action.toSetValues) {
                    newData[toSet.field] = toSet.value
                }
                newState[action.form] = newData
                newState.formsStateCopy[action.form] = newData
                newState.areFormsEdited[action.form] = {}
                return newState
            }
        case actionTypes.UPDATE_CALENDAR:
            return {
                ...state,
                calendarEvents: action.calendarData
            }
        case actionTypes.LOG_IN:
            return {
                ...state,
                isLoggedIn: action.isLoggedIn,
                userLvl: action.userLvl
            }
        case actionTypes.SET_TABLE:
            {
                const newState = { ...state }
                newState[action.table] = [...action.tableData]
                newState.formsStateCopy[action.table] = [...action.tableData].map(el => { return { ...el } })
                newState.areFormsEdited[action.table] = []
                return newState
            }
        case actionTypes.UPDATE_TABLE:
            {
                const newState = { ...state }
                newState[action.table] = [...newState[action.table]]
                newState[action.table][action.id][action.field] = action.value
                const areFormsEdited = { ...newState.areFormsEdited }
                const isFormEdited = [ ...areFormsEdited[action.table]] 
                isFormEdited[action.id] = action.value != state.formsStateCopy[action.table][action.id][action.field]
                areFormsEdited[action.table] = isFormEdited
                newState.areFormsEdited = areFormsEdited

                return newState
            }
        case actionTypes.SET_REFRESH_TREATMENT_TABLE:
            return {
                ...state,
                refreshTreatmentTableFn: action.fn
            }
    }
    return state;
}
export default reducer;