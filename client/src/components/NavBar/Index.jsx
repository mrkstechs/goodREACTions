import React from 'react'
import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { FaBars, FaArrowCircleLeft } from 'react-icons/fa'

const NavBar = () =>{
    const navigate = useNavigate()
    return(<>
            <nav id="navBar">
                <div id="back-btn" onClick={() => console.log('clicked!')}>
                    <FaArrowCircleLeft/>
                </div>
                <h1>Untitled Quiz Game</h1>
                <div id="icon">
                        <FaBars />
                    </div>
            </nav>
            <Outlet />
        </>
    )
}

export default NavBar;
