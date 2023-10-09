import React from "react"

import Home from "./assets/pages/Home"
import { Route, Routes } from "react-router-dom"
import Admin from "./assets/pages/Admin"
import NewBooking from "./assets/components/NewBooking"
import AllBookings from "./assets/components/AllBookings"
export default function App(){
  return(
    <>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route path="/admin" element={<Admin/>}>
        <Route path="/admin/newBooking" element={<NewBooking/>}/>
        <Route path="/admin/allBookings" element={<AllBookings/>}/>
      </Route>
    </Routes>
    </>
  )
}