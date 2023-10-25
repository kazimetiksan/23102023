import * as userSlice from './userSlice'

import store from './store'

export const getAll = params => store.dispatch(userSlice.getAll(params))
export const addNew = params => store.dispatch(userSlice.addNew(params))
export const updateUser = params => store.dispatch(userSlice.updateUser(params))