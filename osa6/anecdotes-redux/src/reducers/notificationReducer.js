import { createSlice } from '@reduxjs/toolkit'




const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        changeNotification(state, action) {
            state = action.payload
            return action.payload
      }
    }
  })


export const setNotification = (content, time) => {
    return async dispatch => {
        dispatch(changeNotification(content))
        setTimeout(() => {
            dispatch(changeNotification(null))
          }, time * 1000)
    }
}

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer