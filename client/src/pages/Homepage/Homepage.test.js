import { screen, render, queryByAttribute } from '@testing-library/react';
import Homepage from '.'
import Popup from '.'
import {BrowserRouter as Router} from 'react-router-dom';
import React from 'react'
import '@testing-library/jest-dom'
import { exportedForTesting } from "./Index"

describe('Homepage', () =>{
    beforeEach(() =>{
        render(<Homepage />, { wrapper: Router } )
    })
    
    test('It has button to join lobby', () =>{
        const joinLobby = screen.getByRole('button', { name: "Join Lobby"})
        expect(joinLobby).toBeInTheDocument()
        expect(joinLobby.textContent).toBe("Join Lobby")
    })

    test('Header components can be seen', () =>{
        const username = screen.getByRole('img', { name: 'Welcome to Quizzic'})
        expect(username).toBeInTheDocument()
    })

    test("Leaderboard buttons sends to leaderboard page", () => {
        const leaderboardButton = screen.getByRole('button', { name: "Leaderboard"}) 
        const { navigate } = exportedForTesting 
        fireEvent.click(leaderboardButton);
        expect(navigate).toHaveBeenCalledWith("/leaderboard")
    })

    test("Update username state with input", () => {
        const updateUsername = jest.fn() 
        
        fireEvent.click(screen.getByText("Create Lobby"))
        fireEvent.change(screen.getByRole("input", {name: "usernameInput"}), {target : {value: "a"}})
        fireEvent.
        expect(updateUsername).toHaveBeenCalled()
    })

    test("Update lobbyId state with input", () => {
        const updateLobbyId = jest.fn() 

        fireEvent.click(screen.getByText("Create Lobby"))
        fireEvent.change(screen.getByRole("input", {name: "lobbyInput"}), {target : {value: "a"}})

        expect(updateLobbyId).toHaveBeenCalled()
    })
})
