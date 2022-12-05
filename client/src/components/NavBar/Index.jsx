import React from 'react'
import { Outlet } from 'react-router-dom'

import { FaBars } from 'react-icons/fa'

const NavBar = () =>{
    return(<>
            <div id="navBar">
                <h1>Untitled Quiz Game</h1>
                <div id="icon">
                        <FaBars />
                    </div>
            </div>
            <Outlet />
        </>
    )
}

export default NavBar;
