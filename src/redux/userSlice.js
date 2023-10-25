import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = []

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setAll: (state, {payload}) => {

        // senkron

        console.log('state', state)
        console.log('payload', payload)

        return payload
      },
      add: (state, {payload}) => {

        console.log('state', state)
        console.log('payload', payload)

        return [
          ...state,
          payload
        ]
      }
    }
})

export const {
  setAll,
  add
} = userSlice.actions

// ASYNC

export const getAll = createAsyncThunk('getAll', (params, {getState, dispatch}) => {

  console.log('getAll params', params)

  const url = 'https://reactpm.azurewebsites.net/api/users'
  
  axios.get(url)
    .then((response) => {

      console.log('redux response', response.data)

        dispatch(
            setAll(
                response.data
            )
        )
    })
    .catch((error) => {

      console.log('error', error)
    })
})

export default userSlice.reducer