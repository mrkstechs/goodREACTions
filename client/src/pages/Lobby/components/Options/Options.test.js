import React, {useState} from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { useLocation, useNavigate } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Options from "./index";
import Lobby from "../../index"

jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn()
  }));

describe("Options", () => {

    beforeEach(() => {
        const config ={
            category: "any",
            difficulty: "any",
            timer: "30",
            maxPlayers: "4",
            numQuestions: "10"
        }

        useLocation.mockReturnValue( {state: {
            lobbyId: "TestLobby",
            username: "TestUser",
            userList: ["TestUser", "TestUser2"],
            host: "TestUser"
        }})
    
        render(        
        <Lobby
            lobbyId="TestLobby"
            username="TestUser"
            userList={ ["TestUser", "TestUser2"]}
            host="TestUser"
          />
            // <Options config={config}/>
          );
    })

    it("Updates category state ", () => {

        const categoryBox = screen.getByRole("combobox", {name: "category"})
        fireEvent.change(categoryBox, {target: {value: "9"}})

        expect(categoryBox).toBeInTheDocument()
        expect(categoryBox).toHaveValue("9")
    })

    
    it("Updates difficulty state ", () => {

        const difficultyBox = screen.getByRole("combobox", {name: "difficulty"})
        fireEvent.change(difficultyBox, {target: {value: "easy"}})

        expect(difficultyBox).toBeInTheDocument()
        expect(difficultyBox).toHaveValue("easy")
    })

    
    it("Updates timer state ", () => {

        const timerBox = screen.getByRole("slider", {name: "timer"})
        fireEvent.change(timerBox, {target: {value: "9"}})

        expect(timerBox).toBeInTheDocument()
        expect(timerBox).toHaveValue("9")
    })

    
    it("Updates maxPlayers state ", () => {

        const maxPlayersBox = screen.getByRole("slider", {name: "maxPlayers"})
        fireEvent.change(maxPlayersBox, {target: {value: "5"}})

        expect(maxPlayersBox).toBeInTheDocument()
        expect(maxPlayersBox).toHaveValue("5")
    })

    it("Updates numQuestions state ", () => {

        const numQuestionsBox = screen.getByRole("slider", {name: "numQuestions"})
        fireEvent.change(numQuestionsBox, {target: {value: "9"}})

        expect(numQuestionsBox).toBeInTheDocument()
        expect(numQuestionsBox).toHaveValue("9")
    })
})
