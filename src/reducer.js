 export const reducer = (state, action) => {
    if(action.type === 'DISPLAY_ALERT') {
        return  {...state,  alert: {show: true, msg: 'please enter value', type: 'danger'}}
    }
    if(action.type === 'ADD_ITEM') {
        const newList = [...state.list, action.payload]
        console.log(newList)
        return  {...state,
            isEditing: false,
            alert: {show: true, msg: 'item added to the list', type: 'success'},
            list: newList
        }
    }
    if(action.type === 'HIDE_ALERT') {
        return {...state, alert: {show: false, msg: '', type: ''}}
    }
    if(action.type === 'REMOVE_ITEM') {
        return {...state, list: action.payload}
    }
    if(action.type === 'EDIT_ITEM') {
        return {...state, alert: {show: true, msg: 'editing', type: 'success'}, isEditing: true, editId: action.payload}
    }if(action.type === 'SUBMIT_EDIT') {
        return {...state, alert: {show: true, msg: 'value changed', type: 'success'}, isEditing: false }
    }
    throw new Error('no matching action type')
}