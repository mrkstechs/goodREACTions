import { screen, render } from '@testing-library/react';
import NavBar from '.'
import {BrowserRouter as Router} from 'react-router-dom';

describe('NavBar', () =>{
    beforeEach(() =>{
        render(
        <Router>
        <NavBar />
      </Router>
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
        expect(heading.textContent).toContain("Untitled Quiz Game")
    })
})
