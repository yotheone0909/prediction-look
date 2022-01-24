export default class Prediction {
    constructor(roundId, homeId, awayId, amountHome, amountAway, amountDraw, totalAmount, timeCreatePrediction, timeEndPrediction, timeLockPrediction, positionWin) {
        this.roundId = roundId
        this.homeId = homeId;
        this.awayId = awayId;
        this.amountHome = amountHome;
        this.amountAway = amountAway;
        this.amountDraw = amountDraw;
        this.totalAmount = totalAmount;
        this.timeCreatePrediction = timeCreatePrediction;
        this.timeEndPrediction = timeEndPrediction;
        this.timeLockPrediction = timeLockPrediction;
        this.positionWin = positionWin;
    }

}
