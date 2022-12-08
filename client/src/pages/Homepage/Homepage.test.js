import { screen, render, queryByAttribute } from '@testing-library/react';
import Homepage from '.'
import Popup from '.'
import {BrowserRouter as Router} from 'react-router-dom';

describe('Homepage', () =>{
    beforeEach(() =>{
        render(<Homepage />, { wrapper: Router } )
    })

    test('It has button to create lobby', () =>{
        const createLobby = screen.getByRole('button', { name: "Create Lobby"})
        expect(createLobby).toBeInTheDocument()
        expect(createLobby.textContent).toBe("Create Lobby")
    })

    test('It has button to join lobby', () =>{
        const joinLobby = screen.getByRole('button', { name: "Join Lobby"})
        expect(joinLobby).toBeInTheDocument()
        expect(joinLobby.textContent).toBe("Join Lobby")
    })

    test('It has button to see Leaderboard', () =>{
        const leaderboardLobby = screen.getByRole('button', { name: "Leaderboard"})
        expect(leaderboardLobby).toBeInTheDocument()
        expect(leaderboardLobby.textContent).toBe("Leaderboard")
    })

    // test('It has a form', () =>{
    //     const getById = queryByAttribute.bind(null, 'id')
    //     const container = render(<Popup/>, { wrapper: Router })
    //     const form = getById(container.container, 'form')
    //     expect(form).toBeInTheDocument();
    // })

    // test('div containing form', () =>{
    //     const {container} = render(<Popup/>, { wrapper: Router })
    //     const div = container.getElementsByClassName('popupForm')

    //     expect(div).toBeInTheDocument()
    // })

    test('Header components can be seen', () =>{
        const username = screen.getByRole('img', { name: 'Welcome to Quizzic'})
        expect(username).toBeInTheDocument()
    })
    // test('form has title', () =>{
    //     const heading = screen.getByRole('heading', { name: 'Create Lobby'})
        
    //     expect(heading).toBeInTheDocument()
    //     expect(heading.textContent).toBe('Create Lobby')
    // })
    // test('Popup', () =>{
    //     const container = render(<Popup/>, { wrapper: Router})
    //     const header = container.getByRole('heading')

    //     expect(header).toBeInTheDocument()
    // })
})
