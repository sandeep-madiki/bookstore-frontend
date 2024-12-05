import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'

const PrivateRoutes = () => {

    const searchParams = new URLSearchParams(window.location.search)
    const redirectParam: string = decodeURIComponent(searchParams?.get('redirect') ?? '')
  return (
   <Routes>
    <Route path='auth/*' element={<Navigate to={redirectParam || '/dashboard'}/>} />
    <Route path='dashboard' element={<p>Dashboard</p>} />
    <Route path='/test' element={<p>test</p>} />
   </Routes>
  )
}

export default PrivateRoutes