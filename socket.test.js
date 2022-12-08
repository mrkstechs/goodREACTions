const io = require("socket.io-client");
const { fetchQuestions } = require("./index")

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

    test("Recieves userList on get-user-list emit", () => {

        const socket = io("http://localhost:2333");

        socket.on("connect", () => {
            socket.emit("get-user-list", socket.id)
        });

        socket.emit("get-user-list", socket.id)

        socket.on("send-user-list", (userList) => {
            expect(userList).toBe(socket.id)
        })
    })

    test("Start game function works and gets questions from API", () => {
        const socket = io("http://localhost:2333");

        const options = {
            category: "any",
            difficulty: "any",
            timer: "30",
            maxPlayers: "4",
            numQuestions: "10"
        }

        socket.on("connect", () => {
            socket.emit("create-lobby", "my-lobby", "my-username");

            socket.on("start-game", (lobbyId, recievedOptions) => {

                expect(lobbyId).toEqual("my-lobby");
                expect(recievedOptions).toEqual(options);

                socket.emit("start-game", "my-lobby", options)
            })

        });
    
        socket.on("game-starting", (questionData) => {
            const lobby = server.sockets.adapter.rooms.get(lobbyId)

            expect(lobby.activePlayerTracker).toBe(0)
            expect(lobby.activePlayer).toBeDefined()
            expect(lobby.options).toBeDefined()
            expect(lobby.questions).toBeDefined()
            expect(questionData).toBeDefined()
        })
    })


    test("initialises game", () => {

        const options = {
            category: "any",
            difficulty: "any",
            timer: "30",
            maxPlayers: "4",
            numQuestions: "10"
        }
        
        const socket = io("http://localhost:2333");

        socket.on("connect", () => {
            socket.emit("create-lobby", "my-lobby", "my-username");
            socket.emit("start-game", "my-lobby", options)
            socket.emit("init-game", "my-lobby");
        });

        socket.on("send-question", (question, activePlayer) => {
            expect(question).toBeDefined()
            expect(activePlayer).toBe(socket.id)
        })
    })

    test("Generates correct url for API call", async () => {

        const options = {
            category: "any",
            difficulty: "any",
            timer: "30",
            maxPlayers: "4",
            numQuestions: "10"
        };

        const players = ['player1', 'player2'];
        
        const questions = await fetchQuestions(options, players);
        expect(questions).toBeDefined();
        expect(questions.length).toEqual(5 * players.length);
    })
})
