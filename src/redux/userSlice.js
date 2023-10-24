import {
    createSlice
} from '@reduxjs/toolkit'

const initialState = [{
    firstName: "Kazım",
    lastName: "Etiksan",
    age: 33
  }, {
    firstName: "Elif",
    lastName: "Yavuz",
    age: 43
  }]

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})

export default userSlice.reducer