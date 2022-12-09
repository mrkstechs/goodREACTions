import { screen, render, queryByAttribute, fireEvent } from '@testing-library/react';
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

        fireEvent.click(leaderboardButton);
        expect(window.location.pathname).toBe("/leaderboard")
    })

    test("Update username state with input", () => {
        
        fireEvent.click(screen.getByText("Create Lobby"))
        const usernameBox = screen.getByRole("textbox", {name: "usernameInput"})
        fireEvent.change(usernameBox, {target : {value: "test"}})
        expect(usernameBox).toHaveValue("test")
    })

    test("Update lobbyId state with input", () => {

        fireEvent.click(screen.getByText("Create Lobby"))
        const lobbyBox = screen.getByRole("textbox", {name: "lobbyInput"})
        fireEvent.change(lobbyBox, {target : {value: "test"}})

        expect(lobbyBox).toHaveValue("test")
    })
})
