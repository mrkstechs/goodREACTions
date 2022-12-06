import { screen, render } from '@testing-library/react';
import Lobby from '.'
import {BrowserRouter as Router} from 'react-router-dom';

describe('Lobby', () =>{

    beforeEach(() =>{
        const lobbyId = "testLobby"
        render(<Lobby />, { wrapper: Router } )
    })

    test('Header is displayed', () => {
        const header = screen.getByRole('nav')
        expect(header).toBeInTheDocument()
        expect(header.firstChild.textContent).toBe("Untitled Quiz Game")
    })

    test('Buttons are correctly generated', () => {
        const backButton = screen.getByRole('button', { name: "backButton"})
        const startButton = screen.getByRole('button', { name: "startButton"})
        expect(backButton).toBeInTheDocument()
        expect(backButton.textContent).toBe("Back")
        expect(startButton).toBeInTheDocument()
        expect(startButton.textContent).toBe("Start Game!")
    })

    test('Lobby Id is correctly displayed', () => {
        const lobbyTitle = screen.getByRole('heading', {name: lobbyHeading})
        expect(lobbyTitle.textContent).toBe("Lobby Id: testLobby")
    })

    test('UserList section is loaded on page', () => {
        const userList = screen.getByRole('region', {name: "player list"})
        expect(userList).toBeInTheDocument()
    })

})
