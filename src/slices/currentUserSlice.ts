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
      state = { ...action.payload }
    },
    updateCurrentUser: (state, action: PayloadAction<FirebaseUserRESTAPI>) => {
      return state = {
        ...state,
        ...action.payload
      }
    },
    deleteCurrentUser: (state) => {
      return state = { ...initialState }
    }
  },
  extraReducers: builder => {
    // signUp
    builder.addMatcher(
      authApi.endpoints.signUp.matchFulfilled,
      (state, { payload }) => {
        return state = {
          ...payload,
          needRelogin: false
        }
      }
    )
    // signIn
    builder.addMatcher(
      authApi.endpoints.signIn.matchFulfilled,
      (state, { payload }) => {
        return state = {...payload}
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
    // changePassword
    builder.addMatcher(
      authApi.endpoints.changePassword.matchFulfilled,
      (state, { payload }) => {
        return state = {
          ...state,
          ...payload
        }
      }
    )
    // refreshToken
    builder.addMatcher(
      authApi.endpoints.refreshToken.matchFulfilled,
      (state, { payload }) => {
        return state = {
          ...state,
          idToken: payload.id_token, 
          refreshToken: payload.refresh_token,
          needRelogin: false
        }
      }
    )
    // getUserData
    builder.addMatcher(
      authApi.endpoints.getUserData.matchFulfilled,
      (state, { payload }) => {
        return state = {
          ...state,
          ...payload
        }
      }
    )
    
  }
})

export const {
  setCurrentUser,
  updateCurrentUser,
  deleteCurrentUser
} = currentUserSlice.actions

export const selectCurrentUser = (state: RootState) => {
  return state.currentUser
}

export default currentUserSlice.reducer
