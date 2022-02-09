import { AUTH, LOGOUT, FORGOT_PASSWORD } from '../constants/actionTypes'
import * as api from '../api'

export const login = (formData, navigate, errorHandler) => async (dispatch) => {
  try {
    const { data } = await api.login(formData)
    if (data.isBoom) {
      throw new Error(data.output.statusCode)
    }
    dispatch({ type: AUTH, data })

    navigate('/', { replace: true })
  } catch (error) {
    console.error(error.message)
    errorHandler(error.message)
  }
}

export const register =
  (formData, navigate, errorHandler) => async (dispatch) => {
    try {
      const { data } = await api.register(formData)
      if (data.isBoom) {
        throw new Error(data.output.statusCode)
      }
      dispatch({ type: AUTH, data })

      navigate('/', { replace: true })
    } catch (error) {
      console.error(error.message)
      errorHandler(error.message)
    }
  }

export const logout = () => async (dispatch) => {
  try {
    const { data } = await api.logout()
    if (data.isBoom) {
      throw new Error(data.output.statusCode)
    }
    dispatch({ type: LOGOUT })
  } catch (error) {
    dispatch({ type: LOGOUT })
    console.error(error.message)
  }
}

export const forgotPassword =
  (formData, errorHandler, setEmailSent) => async (dispatch) => {
    try {
      const { data } = await api.forgotPassword(formData)
      if (data.isBoom) {
        throw new Error(data.output.statusCode)
      }
      dispatch({ type: FORGOT_PASSWORD })
      setEmailSent(true)
    } catch (error) {
      console.error(error.message)
      errorHandler(error.message)
    }
  }

export const logoutAllSessions = () => async (dispatch) => {
  try {
    const { data } = await api.logoutAllSessions()
    if (data.isBoom) throw new Error(data.output.statusCode)
    dispatch({ type: LOGOUT })
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteAccount = (userId) => async (dispatch) => {
  try {
    const { data } = await api.deleteAccount(userId)
    if (data.isBoom) throw new Error(data.output.statusCode)
    dispatch({ type: LOGOUT })
  } catch (error) {
    console.log(error.message)
  }
}

export const getRefreshToken = () => async (dispatch) => {
  try {
    const { data } = await api.refreshToken()
    if (data.isBoom) {
      throw new Error(data.output.statusCode)
    }
    dispatch({ type: AUTH, data })
  } catch (error) {
    console.log(error.message)
    dispatch({type: LOGOUT})
  }
}