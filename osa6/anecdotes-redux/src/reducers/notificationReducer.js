import { createSlice } from '@reduxjs/toolkit'




const notificationSlice = createSlice({
    name: 'notification',
    initialState: 'baseNotificationMessage',
    reducers: {
        setNotification(state, action) {
        return action.payload
      }
    }
  })


export default notificationSlice.reducer