import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit'

import axios from 'axios'

const initialState = {
  list: [],
  profile: undefined  ,
  xauth: undefined
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setAll: (state, {payload}) => {

        state.list = payload
      },
      add: (state, {payload}) => {

        state.list.push(payload)
      },
      update: (state, {payload}) => {

        state.list = state.list.map((item) => {

          if (item._id === payload._id) {
            return payload
          }

          return item
        })
      },
      remove: (state, {payload:_id}) => {

        state.list = state.list.filter(item => item._id !== _id)
      },
      setProfile: (state, {payload}) => {

        const {
          profile,
          xauth
        } = payload

        state.profile = profile
        state.xauth = xauth
      }
    }
})

export const {
  setAll,
  add,
  update,
  remove,
  setProfile
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

export const signIn = createAsyncThunk('signIn', (params, {getState, dispatch}) => {

  console.log('signIn params', params)

  const {
    callback,
    userInfo
  } = params

  const url = '/api/signin'
  
  axios.post(url, userInfo)
    .then((response) => {

        console.log('signin response', response)

        const profile = response.data
        const xauth = response.headers.xauth

        sessionStorage.setItem('xauth', xauth)

        dispatch(
          setProfile({
            profile, xauth
          })
        )

        callback(true)
    })
    .catch((error) => {

      console.log('error', error)
      callback(false)
    })
})

export const getMe = createAsyncThunk('getMe', (params, {getState, dispatch}) => {

  console.log('getMe params', params)

  const {
    callback,
    xauth
  } = params

  const url = '/api/me'
  
  axios.get(url, {
    headers: {
      xauth
    }
  })
    .then((response) => {

        console.log('getMe response', response.data)

        const profile = response.data

        dispatch(
          setProfile({
            profile, xauth
          })
        )

        callback(true)
    })
    .catch((error) => {

      console.log('error', error)
      callback(false)
    })
})

export default userSlice.reducer