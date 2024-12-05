import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slices/authSlice'
import {Routes, Navigate} from 'react-router-dom'

const Logout = () => {
    useEffect(() => {

    })
  return (
    <Routes>
        <Navigate to='/auth/login'/>
    </Routes>
  )
}

export default Logout