import React from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { FaBars, FaArrowCircleLeft } from 'react-icons/fa'
import './styles.css'

const NavBar = () =>{
    const navigate = useNavigate()
    return(<>
            <nav id="navBar">
                <h1>Untitled Quiz Game</h1>
                <div id="icon" onClick={() => navigate(-1)}>
                    <FaArrowCircleLeft/>
                </div>
            </nav>
        </>
    )
}

export default NavBar;
