import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useEffect } from "react";

export const useHandleAccountChanged = () => {
    const { isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    useEffect(() => {
        if (isConnected) {
            walletProvider.on("accountsChanged", () => {
                window.location.reload();
            });
        }
    }, [isConnected]);
};

export const useHandleChainChanged = () => {
    const { isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    useEffect(() => {
        if (isConnected) {
            walletProvider.on("chainChanged", () => {
                window.location.reload();
            });
        }
    }, [isConnected]);
};