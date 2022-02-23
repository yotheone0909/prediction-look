export default class UserPrediction
{
    constructor(roundId, positionPredict, amount, isClaimed) {
        this.roundId = roundId;
        this.positionPredict = positionPredict;
        this.amount = amount;
        this.isClaimed = isClaimed;
    }
}