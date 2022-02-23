import { ethers } from "ethers";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { contractBetAbi, contractBetAddress, tokenAbi, busdTokenAddress } from "../component/constants/Constants";

const AppContext = createContext({});

export function AppWrapper({ children }) {

    const [etherWeb3, setEtherWeb3] = useState(null);
    const [address, setAddress] = useState(null);
    const [tokenBusd, setTokenBusd] = useState(null);
    const [contranctBet, setContranctBet] = useState(null);
    const [signer, setSigner] = useState(null);
    const [modalError, setModalError] = useState(false);

    useEffect(async () => {

        if (window.ethereum) {
            let _etherWeb3 = new ethers.providers.Web3Provider(window.ethereum, "any");
            setEtherWeb3(_etherWeb3);
            if (window.ethereum.networkVersion !== 56) {
                checkSwitchNetwork();
            }
        } else {
            console.error("Not Install Metamask");
        }
    }, [])

    useEffect(async () => {
        try {
            if (etherWeb3) {
                let addresses = await etherWeb3.listAccounts();

                setAddress(addresses[0])
                setSigner(etherWeb3.getSigner())

                ethereum.on("accountsChanged", (addresses) => {
                    window.location.reload();
                })
                ethereum.on('chainChanged', (chainId) => {
                    window.location.reload();
                  });
            }
        } catch (error) {
            console.log("Error Error", error);
        }

        var url = "https://bsc-dataseed.binance.org/"
        const provider = new ethers.providers.JsonRpcProvider(url);
        const contract = new ethers.Contract(busdTokenAddress, tokenAbi, provider)
        setTokenBusd(contract)
        const contractBet = new ethers.Contract(contractBetAddress, contractBetAbi, provider)
        setContranctBet(contractBet)

        values

    }, [etherWeb3])

    const values = useMemo(() => {

        return {
            connect: async () => {
                try {
                    // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

                    await etherWeb3.send("eth_requestAccounts", []).then(() => {
                        console.log("eth_requestAccounts");
                    }).catch(() => {
                        console.log("No Login");
                    });
                    // let addresses = await etherWeb3.listAccounts()

                    setAddress(accounts[0])

                } catch (error) {
                    location.reload()
                }

            },
            signer: signer,
            address: address,
            contranctBet: contranctBet,
            tokenBusd: tokenBusd

        }
    }, [address, tokenBusd, contranctBet, etherWeb3])

    const checkSwitchNetwork = async () => {

        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
            });
        } catch (error) {
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: '0x38',
                                rpcUrl: 'https://bsc-dataseed.binance.org/',
                            },
                        ],
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
        }
    }

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}