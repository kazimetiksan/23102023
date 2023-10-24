import {
    createSlice
} from '@reduxjs/toolkit'

const initialState = [{
    _id: "abc",
    firstName: "Kazım",
    lastName: "Etiksan",
    age: 33
  }, {
    _id: "def",
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