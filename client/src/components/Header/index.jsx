import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar'
import './styles.css'

const Header = () => {
  return (
    <>
        <header><NavBar/></header>
        <main><Outlet/></main>
    </>
  )
}

export default Header