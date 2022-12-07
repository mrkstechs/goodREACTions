// import { screen, render } from '@testing-library/react';
// import Lobby from '.'
// import {BrowserRouter as Router} from 'react-router-dom';

// const { createServer } = require("http");
// const { Server } = require("socket.io");
// const Client = require("socket.io-client");

import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { useLocation, useNavigate } from 'react-router-dom'
import Lobby from "./index";



jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn()
  }));

  describe("Lobby", () => {

    beforeEach(() => {
        useLocation.mockReturnValue( {state: {
            lobbyId: "TestLobby",
            username: "TestUser",
            userList: ["TestUser", "TestUser2"],
            host: "TestUser"
        }})
    })

    it("renders the correct elements", () => {
      const { getByText } = render(
        <Lobby
          lobbyId="TestLobby"
          username="TestUser"
          userList={ ["TestUser", "TestUser2"]}
          host="TestUser"
        />
      );
  
      expect(getByText("Lobby Id: TestLobby")).toBeInTheDocument();

      expect(getByText("Players:")).toBeInTheDocument();
      expect((screen.getAllByRole("combobox"))[0]).toBeInTheDocument();

      expect(getByText("TestUser2")).toBeInTheDocument();

      expect(getByText("Start Game!")).toBeInTheDocument();
    });
  
    it("navigates to the correct page when start game is clicked", () => {
      const navigate = jest.fn();
      useNavigate.mockImplementation(() => navigate);
      const { getByText } = render(
        <Lobby
          lobbyId="123"
          username="testuser"
          userList={["user1", "user2"]}
          host={true}
        />
      );
  
      fireEvent.click(getByText("Start Game!"));
      expect(navigate).toHaveBeenCalledWith("/question");
    });
  });












// describe('Lobby', () =>{
//     let io, serverSocket, clientSocket;

//     beforeAll((done) => {
//       const httpServer = createServer();
//       io = new Server(httpServer);
//       httpServer.listen(() => {
//         const port = httpServer.address().port;
//         clientSocket = new Client(`http://localhost:${port}`);
//         io.on("connection", (socket) => {
//           serverSocket = socket;
//         });
//         clientSocket.on("connect", done);
//       });
//     });
  
//     afterAll(() => {
//         io.close();
//         clientSocket.close();
//       });

//     test('Buttons are correctly generated', () => {
//         const backButton = screen.getByRole('button', { name: "backButton"})
//         const startButton = screen.getByRole('button', { name: "startButton"})
//         expect(backButton).toBeInTheDocument()
//         expect(backButton.textContent).toBe("Back")
//         expect(startButton).toBeInTheDocument()
//         expect(startButton.textContent).toBe("Start Game!")
//     })

//     test('Server recieves "start-game" with lobbyId and options', () => {
//         serverSocket.on("start-game", (lobbyId, options) => {
//             expect(lobbyId).toBe("TestLobby");
//             expect(options).toBe({category: "Test"})
//         })

//         clientSocket.emit("start-game", "TestLobby", {category: "Test"})
//     })

//     test('Lobby Id is correctly displayed', () => {
//         const lobbyTitle = screen.getByRole('heading', {name: lobbyHeading})
//         expect(lobbyTitle.textContent).toBe("Lobby Id: testLobby")
//     })

//     test('UserList section is loaded on page', () => {
//         const userList = screen.getByRole('region', {name: "player list"})
//         expect(userList).toBeInTheDocument()
//     })

// })
