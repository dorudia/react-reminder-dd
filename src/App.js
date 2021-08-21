import React, { useState, useEffect,useReducer } from 'react'
import List from './List'
import Alert from './Alert'
import {reducer} from "./reducer";

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if(list) {
    return JSON.parse(list)
  }else {
    return []
  }
}

const defaultState = {
  list: getLocalStorage(),
  isEditing: false,
  editId: null,
  alert: {show: false, msg: '', type: ''},
  areYouSure: false,
  background: false,

}

function App() {
  const [name, setName] = useState('');
  const[state, dispatch] = useReducer(reducer, defaultState)

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name) {
    //  display alert
      dispatch({type: 'DISPLAY_ALERT'})
    }
    if (name && state.isEditing) {
       // deal with edit
        state.list = (state.list.map((item) => {
          if(item.id === state.editId) {
            return {...item, title: name}
          }
          return item
        }))

      dispatch({type: 'SUBMIT_EDIT'})
      setName('')
    }

    if (name && !state.isEditing){

      let  newItem = {id: new Date().getTime().toString(), title: name}
      dispatch({type: 'ADD_ITEM', payload: newItem})
     setName(() => {
       return ''
     })
    }

  }

  const removeAlert = () => {
    dispatch({type: 'HIDE_ALERT'})
  }
  const removeItem = (id) => {
    const filterList = state.list.filter((item) => item.id !== id)
    dispatch({type: 'REMOVE_ITEM', payload: filterList})
  }
  const editItem= (id) => {
    const editedItem = state.list.find((item) => item.id === id)
    setName(editedItem.title)
    const editingId = editedItem.id;
    console.log(editedItem.title)
    dispatch({type: 'EDIT_ITEM', payload: editingId})
  }


  useEffect(() => {
    localStorage.setItem('list',JSON.stringify(state.list))
  },[state.list])

  return <>
    {state.alert.show && <Alert {...state.alert} removeAlert={removeAlert} list={state.list}/>}
    <section className={`${ state.background ? 'section-center backdround': 'section-center'}`}>
      <form onSubmit={handleSubmit} className="grocery-form">
        <h3>React Reminder</h3>
        <div className="form-control">
          {/*<input type={'text'} className={'grocery'} placeholder={'enter your reminder'}*/}
          {/*       value={name}*/}
          {/*       onChange={(e) => setName(e.target.value)}/>*/}
          <textarea  className={'grocery'} rows="6"  value={name} onChange={(e) => setName(e.target.value)}/>
          <button type={'submit'} className={'submit-btn'}>{state.isEditing? 'edit': 'submit'}</button>
        </div>
      </form>
      <div className="reminder-container">
        <List items={state.list} removeItem={removeItem} editItem={editItem} />
        {/*<button className={'clear-btn'} onClick={clearlist}>clear items</button>*/}
      </div>

    </section>
  </>

}


export default App
