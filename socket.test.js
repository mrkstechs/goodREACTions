const io = require("socket.io-client");
require("./index")

describe("SocketServer", () => {
    test("creates a lobby and checks that the server emits the correct messages", (done) => {
        const socket = io("http://localhost:2333");
      
        socket.on("connect", () => {
          socket.emit("create-lobby", "my-lobby", "my-username");
        });
      
        socket.on("console-message", (message) => {
      
          expect(message).toBe(`Created lobby. LobbyId: my-lobby`);
      
          socket.on("send-to-lobby", (lobbyId, username, userList, gameHost) => {
            expect(lobbyId).toBe("my-lobby");
            expect(username).toBe("my-username");
            expect(userList).toEqual(["my-username"]);
            expect(gameHost).toBe(socket.id);
      
            socket.close();
            done();
          });
        });
      });
})
