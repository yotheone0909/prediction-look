import { utils } from "ethers";
import { useRef, useState } from "react";
import { useLayoutContext } from "../context/LayourContext";

export default function BottomMatchItem({ contranctBet, signer, amountAllow, address, isLive, isMatchEnd, isApprove, userPrediction, predictionModel, matchRoundIds }) {

    const { isShowError, setLoading } = useLayoutContext();
    const [amount, setAmount] = useState(0);
    const textAmount = useRef(null);

    function getPredictWin() {
        if (address != null) {
            return userPrediction?.positionPredict != 0 && predictionModel.positionWin != 0 && (userPrediction?.positionPredict == predictionModel.positionWin || userPrediction?.positionPredict != 0 && predictionModel.positionWin == 4)
        } else {
            return false;
        }
    }

    function getPredictLoser() {
        if (address != null) {
            return userPrediction?.positionPredict != 0 && predictionModel.positionWin != 0 && userPrediction?.positionPredict != predictionModel.positionWin
        } else {
            return false;
        }
    }

    function getLayoutClaim() {

        return <div className="flex flex-col max-w-full content-center">
            <blockquote className="text-2xl font-semibold italic text-center text-slate-900">
                You Win
            </blockquote>
            <button type="button" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" onClick={() => {
                handleBtnClaimClick()
            }}>Claim</button>
        </div>;
    }

    function getLayoutLoser() {

        return <div className="flex flex-col max-w-full content-center">
            <blockquote className="text-2xl font-semibold italic text-center text-slate-900">
                You Loser
            </blockquote>
        </div>;
    }

    const htmlInputAmount = <form className=" rounded px-2 pt-2 pb-2">
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                Amount (BUSD)
            </label>
            <input ref={textAmount} disabled={isLive || isMatchEnd} className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" id="username" type="number" placeholder="BUSD" onChange={(e) => setAmount(e.target.value)} />
        </div>
    </form>

    function showSelectedTeam() {
        let result;
        if (matchRoundIds == null) {
            return "";
        }
        if (matchRoundIds.includes(predictionModel.roundId)) {
            if (userPrediction?.positionPredict == 1) {
                result =
                    <div className="flex flex-row gap-4 mb-2">
                        <div className="flex bg-emerald-300 border-solid border-2 border-red-700 basis-1/2 rounded-full">
                            <div className="flex-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
                            </div>
                            <div className="grow">
                                Entered
                            </div>
                        </div>
                        <div className="flex basis-1/2 rounded-full">
                            <div className="flex-none">

                            </div>
                            <div className="grow">

                            </div>
                        </div>
                        <div className="flex basis-1/2 rounded-full">
                            <div className="flex-none">

                            </div>
                            <div className="grow">

                            </div>
                        </div>
                    </div>
            } else if (userPrediction?.positionPredict == 2) {
                result = <div className="flex flex-row gap-4 mb-2">
                    <div className="flex basis-1/2 rounded-full">
                        <div className="flex-none">

                        </div>
                        <div className="grow">

                        </div>
                    </div>
                    <div className="flex basis-1/2 rounded-full">
                        <div className="flex-none">

                        </div>
                        <div className="grow">

                        </div>
                    </div>
                    <div className="flex bg-emerald-300 border-solid border-2 border-red-700 basis-1/2 rounded-full">
                        <div className="flex-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
                        </div>
                        <div className="grow">
                            Entered
                        </div>
                    </div>
                </div>
            } else if (userPrediction?.positionPredict == 3) {
                result = <div className="flex flex-row gap-4 mb-2">
                    <div className="flex basis-1/2 rounded-full">
                        <div className="flex-none">

                        </div>
                        <div className="grow">

                        </div>
                    </div>
                    <div className="flex bg-emerald-300 border-solid border-2 border-red-700 basis-1/2 rounded-full">
                        <div className="flex-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
                        </div>
                        <div className="grow">
                            Entered
                        </div>
                    </div>
                    <div className="flex basis-1/2 rounded-full">
                        <div className="flex-none">

                        </div>
                        <div className="grow">

                        </div>
                    </div>
                </div>
            }
        } else {
            result = ""
        }
        return result;
    }

    const htmlButtonPredict = <>
        {showSelectedTeam()}
        <div className={(matchRoundIds.includes(predictionModel.roundId) ? "opacity-25 " : "") + "basis-1/3 grid grid-cols-3 content-center mb-2 gap-4"}>
            <button className={((isLive || isMatchEnd || matchRoundIds.includes(predictionModel.roundId)) ? "cursor-not-allowed " : "") + "basis-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} onClick={() => handleBtnHomeClick()}>
                Home
            </button>
            <button className={((isLive || isMatchEnd || matchRoundIds.includes(predictionModel.roundId)) ? "cursor-not-allowed " : "") + "basis-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} onClick={() => handleBtnDrawClick()}>
                Draw
            </button>
            <button className={((isLive || isMatchEnd || matchRoundIds.includes(predictionModel.roundId)) ? "cursor-not-allowed " : "") + "basis-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} onClick={() => handleBtnAwayClick()}>
                Away
            </button>
        </div>
    </>

    const htmlButtonApprove = <div>
        <button className="w-full mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => {
            approveContract()
        }}>
            Approve
        </button>
    </div>


    const handleBtnHomeClick = () => {
        if (address == null) {
            return;
        }
        if (matchRoundIds.includes(predictionModel.roundId)) {
            return;
        }
        if (textAmount.current.value < 1) {
            textAmount.current.focus();
        } else {
            predictionHome(amount)
        }
    };

    const handleBtnDrawClick = () => {
        if (address == null) {
            return;
        }
        if (matchRoundIds.includes(predictionModel.roundId)) {
            return;
        }
        if (textAmount.current.value < 1) {
            textAmount.current.focus();
        } else {
            predictionDraw(amount)
        }
    };

    const handleBtnAwayClick = () => {
        if (address == null) {
            return;
        }
        if (matchRoundIds.includes(predictionModel.roundId)) {
            return;
        }
        if (textAmount.current.value < 1) {
            textAmount.current.focus();
        } else {
            predictionAway(amount)
        }
    };

    const handleBtnClaimClick = async () => {
        if (address == null) {
            return;
        }
        setLoading(true);
        try {
            let connectContractBet = contranctBet.connect(signer)
            const tx = await connectContractBet?.claimReward(predictionModel.roundId, address);

            await tx.wait().then(() => {
                setLoading(false);
                location.reload()
            }).catch((error) => {
                setLoading(false);
            });
        } catch (error) {
            error.data.message

            setLoading(false);
            isShowError(true);
            setTimeout(() => {
                isShowError(false);
            }, 3000);
        }
    }
    const predictionHome = async (amount) => {
        if (address == null) {
            return;
        }

        setLoading(true);
        if (parseInt(amountAllow) > parseInt(amount)) {
            let connectContractBet = contranctBet.connect(signer)
            const amountWei = utils.parseEther(amount);

            try {
                const tx = await connectContractBet?.predictionHome(predictionModel.roundId, amountWei);

                await tx.wait().then(() => {

                    setLoading(false);

                    location.reload()
                }).catch(() => {
                    setLoading(false);
                });
            } catch (error) {

                setLoading(false);
            }


        } else {
            let contract = tokenBusd.connect(signer)
            const amountWei = utils.parseEther(amount);
            try {
                const tx = await contract?.increaseAllowance(contractBetAddress, amountWei)
                await tx.wait().then(() => {

                    setLoading(false);

                    location.reload()
                }).catch(() => {
                    setLoading(false);
                });
            } catch (error) {
                setLoading(false);
            }

        }
    }

    const predictionDraw = async (amount) => {
        if (address == null) {
            return;
        }

        setLoading(true);

        if (parseInt(amountAllow) > parseInt(amount)) {
            let connectContractBet = contranctBet.connect(signer)
            const amountWei = utils.parseEther(amount);
            try {
                const tx = await connectContractBet?.predictionDraw(predictionModel.roundId, amountWei)
                await tx.wait().then(() => {
                    setLoading(false);
                    location.reload()
                }).catch(() => {
                    setLoading(false);
                });
            } catch (error) {
                setLoading(false);
            }


        } else {
            let contract = tokenBusd.connect(signer)
            const amountWei = utils.parseEther(amount);
            try {
                const tx = await contract?.increaseAllowance(contractBetAddress, amountWei)
                await tx.wait().then(() => {
                    setLoading(false);
                    location.reload()
                }).catch(() => {

                });
            } catch (error) {
                setLoading(false);
            }
        }
    }

    const predictionAway = async (amount) => {
        if (address == null) {
            return;
        }
        setLoading(true);
        if (parseInt(amountAllow) > parseInt(amount)) {
            let connectContractBet = contranctBet.connect(signer)
            const amountWei = utils.parseEther(amount);
            try {
                const tx = await connectContractBet?.predictionAway(predictionModel.roundId, amountWei)

                await tx.wait().then(() => {
                    setLoading(false);
                    location.reload()
                }).catch((error) => {
                    setLoading(false);
                });
            } catch (error) {
                setLoading(false);
            }


        } else {
            let contract = tokenBusd.connect(signer)
            const amountWei = utils.parseEther(amount);
            try {
                const tx = await contract?.increaseAllowance(contractBetAddress, amountWei)

                await tx.wait().then(() => {
                    setLoading(false);
                    location.reload()
                }).catch(() => {
                    setLoading(false);
                });
            } catch (error) {
                setLoading(false);
            }

        }
    }
    return (
        <>
            {getPredictWin() || getPredictLoser() ? "" : isApprove ? htmlInputAmount : ""}

            {getPredictWin() ? "" : isApprove ? htmlButtonPredict : htmlButtonApprove}

            {getPredictWin() ? getLayoutClaim() : getPredictLoser() ? getLayoutLoser() : ""}
        </>
    )
}