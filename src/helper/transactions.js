import { BrowserProvider, Contract } from "ethers";
import { toast } from "react-toastify";

export const checkUserConnected = (isConnected, open) => {
    if (!isConnected) {
        toast.error("You not connected!");
        open();
        throw new Error("User disconnected");
    }
};

export const require = (value,message)=>{
    if (!value) {
        toast.error(message);
        throw new Error(message);
    }
}

export const checkUserIsOwner = (isOwner) => {
    if (!isOwner) {
        toast.error("only owner can call this function");
        throw new Error("User is not owner!");
    }
};

export const getUserBalance = async (address, provider) => {
    const ethersProvider = new BrowserProvider(provider);
    const userBalance = await ethersProvider.getBalance(address);
    return userBalance;
};

export const transaction = async (
    contractFunction,
    value,
    setDisabled,
    isConnected,
    open
) => {
    checkUserConnected(isConnected, open);
    try {
        setDisabled(true);
        if(value){
            var tx = await contractFunction(value);
        }
        else{
            var tx = await contractFunction();
        }
        await toast.promise(tx.wait(), {
            pending: "pending transaction",
            error: "ERROR",
            success: "transaction successfully done!",
        });
    } catch (error) {
        toast.error(error.message);
    }
    setDisabled(false);
};

export const transactionOnlyOwner = async (
    contractFunction,
    value,
    setDisabled,
    isConnected,
    open,
    isOwner
) => {
    checkUserIsOwner(isOwner);
    checkUserConnected(isConnected, open);
    try {
        setDisabled(true);
        var tx = await contractFunction(value);
        await toast.promise(tx.wait(), {
            pending: "pending transaction",
            error: "ERROR",
            success: "transaction successfully done!",
        });
    } catch (error) {
        toast.error(error.message);
        setDisabled(false);
        return tx   
    }
    setDisabled(false);
};

export const getDataFromContract = async (contractFunction) => {
    const tx = await contractFunction();
    return tx;
};

export const getDataFromContractWithValue = async (contractFunction,value) => {
    const tx = await contractFunction(value);
    return tx;
};

export const getCollectedDataFromContract = async (contractFunctions) => {
    let data = {};
    try {
        for (const getfunction of contractFunctions) {
            const tx = await getfunction[1]();
            data[getfunction[0]] = tx;
        }
    } catch (error) {
        console.log(error);
    }
    return data;
};

export const getTimeStamp = async (provider) => {
    const block = await provider.getBlock("latest");
    return block.timeStamp;
};

export const createContract = async(address, abi, walletProvider) => {
    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    return new Contract(address, abi,signer );
};
