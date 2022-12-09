import { screen, render } from '@testing-library/react';
import NavBar from '.'
import {BrowserRouter as Router} from 'react-router-dom';
import React from 'react'
import '@testing-library/jest-dom'

describe('NavBar', () =>{
    beforeEach(() =>{
        render(
        <NavBar />, { wrapper: Router }
        )
    })

    test('It has a nav', () =>{
        const nav = screen.getByRole('navigation')
        expect(nav).toBeInTheDocument()
        expect(nav.id).toBe("navBar")
    })

    test('It has a heading', () =>{
        const heading = screen.getByRole('heading')
        expect(heading).toBeInTheDocument()
        expect(heading.textContent).toContain("Let's see who REACTs the Quizzic")
    })
})
