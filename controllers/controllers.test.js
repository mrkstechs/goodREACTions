const scoreController = require('./index')
const Score = require("../models/index")

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson }))
const mockRes = { status: mockStatus }

describe('Goals controller', () => {
    beforeEach(() =>  jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('getScores', () => {
        test('it returns all scores with a 200 status code', async () => {
            const testScores = ['1', '2']
            jest.spyOn(Score, 'all', 'get')
                 .mockResolvedValue(testScores);
            await scoreController.getScores(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(testScores);
        })
    });

    describe('addScore', () => {
        test('new score is created with a 201 status code', async () => {
            const testScores = { name: "test", score: "2" }
            jest.spyOn(Score, 'add')
            .mockResolvedValue(new Score(testScores))
            const mockReq = {body: testScores} 
            await scoreController.addScore(mockReq, mockRes);
        })
    });
});