const io = require("socket.io-client");
const { fetchQuestions } = require("./server")

describe("SocketServer", () => {
   
    test("Logs error when joining non-existing lobby", () => {
        const socket = io("http://localhost:2333");

        socket.on("connect", () => {
            socket.emit("join-lobby", "my-lobby", "my-user2")
        });

        socket.on("console-message", (message) => {
            expect(message).toBe(`Lobby "my-lobby" does not exist`)
        })
    })

    test("creates a lobby and checks that the server emits the correct messages", () => {
    
        const socket = io("http://localhost:2333");

        socket.on("connect", () => {
          socket.emit("create-lobby", "testLobby1", "my-username");
        });
      
        socket.on("console-message", (message) => {
      
          expect(message).toBe(`Created lobby. LobbyId: testLobby1`);
      
          socket.on("send-to-lobby", (lobbyId, username, userList, gameHost) => {
            expect(lobbyId).toBe("testLobby1");
            expect(username).toBe("my-username");
            expect(userList).toEqual(["my-username"]);
            expect(gameHost).toBe(socket.id);
      
            socket.close();
          });
        });
      });

    test("joins an existing lobby", () => {

        const socket = io("http://localhost:2333");

        socket.on("connect", () => {
            socket.emit("create-lobby", "testLobby2", "my-username");
            socket.emit("join-lobby", "testLobby2", "my-user2")
        });
        
        socket.on("console-message", (message) => {
            if(message != "Created lobby. LobbyId: testLobby2"){
                expect(message).toEqual(`Joined lobby. LobbyId: testLobby2`);
            }


            socket.on("send-to-lobby", (lobbyId, username, userList, gameHost) => {
                expect(lobbyId).toBe("testLobby2");
                try {
                    expect(username).toBe("my-username");
                } catch {
                    expect(username).toBe("my-user2");
                }
                expect(userList).toEqual(["my-username", "my-user2"]);
                expect(gameHost).toBe(socket.id);

                socket.close();
            })
        })
    })

    test("Recieves userList on get-user-list emit", () => {

        const socket = io("http://localhost:2333");

        socket.on("connect", () => {
            socket.emit("get-user-list", socket.id)
        });

        socket.on("send-user-list", (userList) => {
            expect(userList).toBe(socket.id)

            socket.close();
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
            socket.emit("create-lobby", "testLobby2", "my-username");

            socket.on("start-game", (lobbyId, recievedOptions) => {

                expect(lobbyId).toEqual("testLobby2");
                expect(recievedOptions).toEqual(options);

                socket.emit("start-game", "testLobby2", options)
            })

        });
    
        socket.on("game-starting", (questionData) => {
            const lobby = server.sockets.adapter.rooms.get(lobbyId)

            expect(lobby.activePlayerTracker).toBe(0)
            expect(lobby.activePlayer).toBeDefined()
            expect(lobby.options).toBeDefined()
            expect(lobby.questions).toBeDefined()
            expect(questionData).toBeDefined()

            socket.close();
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
            socket.emit("create-lobby", "testLobby3", "my-username");
            socket.emit("start-game", "testLobby3", options)
            socket.emit("init-game", "testLobby3");
        });

        socket.on("send-question", (question, activePlayer) => {
            expect(question).toBeDefined()
            expect(activePlayer).toBe(socket.id)

            socket.close();
        })
    })

    test("Generates correct url for API for any category/difficulty", async () => {

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
        expect(questions.length).toEqual(20);

    })

    test("Generates correct url for API for any category but set difficulty", async () => {

        const options = {
            category: "any",
            difficulty: "easy",
            timer: "30",
            maxPlayers: "4",
            numQuestions: "10"
        };

        const players = ['player1', 'player2'];
        
        const questions = await fetchQuestions(options, players);
        expect(questions).toBeDefined();
        expect(questions.length).toEqual(20);
        expect(questions[0].difficulty).toBe("easy");
        expect(questions[3].difficulty).toBe("easy");
        expect(questions[6].difficulty).toBe("easy");

    })

    
    test("Generates correct url for API for any difficulty but set category", async () => {

        const options = {
            category: "9",
            difficulty: "any",
            timer: "30",
            maxPlayers: "4",
            numQuestions: "10"
        };

        const players = ['player1', 'player2'];
        
        const questions = await fetchQuestions(options, players);
        expect(questions).toBeDefined();
        expect(questions.length).toEqual(20);
        expect(questions[0].category).toBe("General Knowledge");
        expect(questions[3].category).toBe("General Knowledge");
        expect(questions[6].category).toBe("General Knowledge");

    })

    test("Generates correct url for API for set difficulty and set category", async () => {

        const options = {
            category: "9",
            difficulty: "easy",
            timer: "30",
            maxPlayers: "4",
            numQuestions: "10"
        };

        const players = ['player1', 'player2'];
        
        const questions = await fetchQuestions(options, players);
        expect(questions).toBeDefined();
        expect(questions.length).toEqual(20);
        expect(questions[0].category).toBe("General Knowledge");
        expect(questions[3].category).toBe("General Knowledge");
        expect(questions[6].category).toBe("General Knowledge");
        expect(questions[0].difficulty).toBe("easy");
        expect(questions[3].difficulty).toBe("easy");
        expect(questions[6].difficulty).toBe("easy");
    })

    
})
