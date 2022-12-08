const io = require("socket.io-client");

describe("Server", () => {
    test("creates a lobby and checks that the server emits the correct messages", (done) => {
        const socket = io("http://localhost:2333");
      
        socket.on("connect", () => {
          socket.emit("create-lobby", "my-lobby", "my-username");
        });
      
        socket.on("console-message", (message) => {
      
          expect(message).toBe(`Created lobby. LobbyId: my-lobby`);
      
          // Wait for the "send-to-lobby" event to be emitted by the server
          socket.on("send-to-lobby", (lobbyId, username, userList, gameHost) => {
            // Check that the server emitted the correct values
            expect(lobbyId).toBe("my-lobby");
            expect(username).toBe("my-username");
            expect(userList).toEqual(["my-username"]);
            expect(gameHost).toBe(socket.id);
      
            // Close the connection and finish the test
            socket.close();
            done();
          });
        });
      });
})
