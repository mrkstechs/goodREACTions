const io = require("socket.io-client");
const request = require("supertest")

const { mock } = require("jest")
const mockApi = mock("./index")

describe("Server", () => {

    test("It recieves highscores from api/highscores", async () => {
        const response = await request(api).get("/api/highscores");

        expect(response.status).toBe(200);
    })

})
