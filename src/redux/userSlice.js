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
      },
      update: (state, {payload}) => {

        // state[payload.index] = payload.user

        return state.map((item) => {

          if (item._id === payload._id) {
            return payload
          }

          return item
        })
      },
      remove: (state, {payload:_id}) => {

        // payload = _id

        return state.filter(item => item._id !== _id)
      }
    }
})

export const {
  setAll,
  add,
  update,
  remove
} = userSlice.actions

// ASYNC

export const getAll = createAsyncThunk('getAll', (params, {getState, dispatch}) => {

  console.log('getAll params', params)

  const {
    callback
  } = params

  const url = '/api/users'
  
  axios.get(url)
    .then((response) => {

      console.log('redux response', response.data)

        dispatch(
            setAll(
                response.data
            )
        )

        callback()
    })
    .catch((error) => {

      console.log('error', error)
      callback()
    })
})

export const addNew = createAsyncThunk('addNew', (params, {getState, dispatch}) => {

  console.log('addNew params', params)

  const {
    callback,
    userInfo
  } = params

  const url = '/api/user'
  
  axios.post(url, userInfo)
    .then((response) => {

        dispatch(
            add(
                response.data
            )
        )

        callback()
    })
    .catch((error) => {

      console.log('error', error)
      callback()
    })
})

export const updateUser = createAsyncThunk('updateUser', (params, {getState, dispatch}) => {

  console.log('updateUser params', params)

  const {
    callback,
    userInfo,
    _id
  } = params

  const url = `/api/user/${_id}`
  
  axios.patch(url, userInfo)
    .then((response) => {

        dispatch(
            update(
                response.data
            )
        )

        callback()
    })
    .catch((error) => {

      console.log('error', error)
      callback()
    })
})

export const removeUser = createAsyncThunk('removeUser', (params, {getState, dispatch}) => {

  console.log('removeUser params', params)

  const {
    callback,
    _id
  } = params

  const url = `/api/user/${_id}`
  
  axios.delete(url)
    .then((response) => {

      if (response.status === 200) {
        dispatch(
          remove(
            _id
          )
        )
      }

        callback()
    })
    .catch((error) => {

      console.log('error', error)
      callback()
    })
})

export const signUp = createAsyncThunk('signUp', (params, {getState, dispatch}) => {

  console.log('signUp params', params)

  const {
    callback,
    userInfo
  } = params

  const url = '/api/signup'
  
  axios.post(url, userInfo)
    .then((response) => {

        console.log('signup response', response)

        callback()
    })
    .catch((error) => {

      console.log('error', error)
      callback()
    })
})

export default userSlice.reducer