import React, { useEffect } from 'react'
import { Outlet, useNavigate, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaArrowCircleLeft } from 'react-icons/fa'
import './styles.css'
import Logo from '../Logo'

const NavBar = () =>{
    const navigate = useNavigate()
    const location = useLocation()

    return(<>
            <nav id="navBar">
                <NavLink to={'/'}>
                    {location.pathname == '/' ? <h1>Let's see who REACTs the Quizzic</h1> : <Logo/>}
                </NavLink>
                <div id="icon" onClick={() => navigate(-1)}>
                    <FaArrowCircleLeft/>
                </div>
            </nav>
        </>
    )
}

export default NavBar;
