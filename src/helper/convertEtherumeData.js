export const toWei = (ether) => {
    return BigInt(ether) * BigInt(Math.pow(10, 18));
};

export const toEther = (wei) => {
    return BigInt(wei) / BigInt(Math.pow(10, 18));
};



