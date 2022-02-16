import { ethers } from "ethers";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { contractBetAbi, contractBetAddress, tokenAbi, yoTokenAddress } from "../constants/constants";

const AppContext = createContext({});

export function AppWrapper({ children }) {

    const [etherWeb3, setEtherWeb3] = useState(null);
    const [address, setAddress] = useState(null);
    const [tokenBusd, setTokenBusd] = useState(null);
    const [contranctBet, setContranctBet] = useState(null);
    const [signer, setSigner] = useState(null)
    const [modalError, setModalError] = useState(false)

    useEffect(async () => {
        let _etherWeb3 = new ethers.providers.Web3Provider(window.ethereum, "any");
        if (_etherWeb3) {
            setEtherWeb3(_etherWeb3);
            let addresses = await _etherWeb3.listAccounts();
            setAddress(addresses[0])
            setSigner(_etherWeb3.getSigner())

            const contract = new ethers.Contract(yoTokenAddress, tokenAbi, _etherWeb3)
            setTokenBusd(contract)
            const contractBet = new ethers.Contract(contractBetAddress, contractBetAbi, _etherWeb3)
            setContranctBet(contractBet)
        }

        ethereum.on("accountsChanged", (addresses) => {
            setAddress(addresses[0])
        })
        values
    }, [])

    const values = useMemo(() => {

        return {
            connect: async () => {
                try {
                    await etherWeb3.send("eth_requestAccounts", []);
                    let addresses = await etherWeb3.listAccounts()

                    setAddress(addresses[0])

                    console.log("useMemo Context: ")

                } catch {
                    location.reload()
                }

            },
            isShowError: (bool) => {
                setModalError(bool);
            },
            modalError: modalError,
            signer: signer,
            address: address,
            contranctBet: contranctBet,
            tokenBusd: tokenBusd

        }
    }, [address, tokenBusd, contranctBet, modalError])

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}