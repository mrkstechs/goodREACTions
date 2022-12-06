import { screen, render } from '@testing-library/react';
import Homepage from '.'
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

    test('It has a form', () =>{
        
    })
})
