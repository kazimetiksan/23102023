import * as userSlice from './userSlice'

import store from './store'

export const getAll = params => store.dispatch(userSlice.getAll(params))
export const addNew = params => store.dispatch(userSlice.addNew(params))
export const updateUser = params => store.dispatch(userSlice.updateUser(params))
export const removeUser = params => store.dispatch(userSlice.removeUser(params))

export const signUp = params => store.dispatch(userSlice.signUp(params))
export const signIn = params => store.dispatch(userSlice.signIn(params))
export const getMe = params => store.dispatch(userSlice.getMe(params))
export const signOut = params => store.dispatch(userSlice.signOut(params))
