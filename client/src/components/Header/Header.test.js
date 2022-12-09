import { screen, render } from '@testing-library/react';
import React from 'react'
import Header from '.'
import NavBar  from '.'
import Outlet  from '.'
import {BrowserRouter as Router} from 'react-router-dom';
import '@testing-library/jest-dom'

describe('Header', ()=>{
    beforeEach(()=>{
        render(<Header/>, { wrapper: Router})
    })

    test('it has a navbar', ()=>{
        const {navbar} = render(<NavBar/>, { wrapper: Router})
        expect(navbar).toBe(undefined)
    })

    test('it has outlet tag', ()=>{
        const {outlet} = render(<Outlet/>, { wrapper: Router})
        expect(outlet).toBe(undefined)
    })
})
