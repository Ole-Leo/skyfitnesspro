import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { authApi } from '../api/auth.api'

import { RootState } from '../store'
import { FirebaseUserRESTAPI } from '../types'

const initialState: FirebaseUserRESTAPI = {
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<FirebaseUserRESTAPI>) => {
      state = {...action.payload}
    },
    deleteCurrentUser: (state) => {
      state = initialState
    }
  },
  extraReducers: builder => {
    // signIn
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        return state = {...payload}
      }
    )
    builder.addMatcher(
      authApi.endpoints.signIn.matchRejected,
      (state, { payload }) => {
        console.error('Sign-in rejected!!!')
      }
    )
    // changeEmail
    builder.addMatcher(
      authApi.endpoints.changeEmail.matchFulfilled,
      (state, { payload }) => {
        return state = {
          ...state,
          ...payload
        }
      }
    )
    builder.addMatcher(
      authApi.endpoints.changeEmail.matchRejected,
      (state, { payload }) => {
        console.error('changeEmail rejected!!!')
      }
    )
  }
})

export const { setCurrentUser, deleteCurrentUser } = currentUserSlice.actions

export const selectUser = (state: RootState) => state.currentUser

export default currentUserSlice.reducer
