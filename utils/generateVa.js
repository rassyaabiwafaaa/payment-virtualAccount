export const generateCorpCode = () => {
    return 'CORP' + Math.floor(1000 + Math.random() * 9000).toString();
};

export const generateCustcode = () => {
    return 'CUST' + Math.floor(10000 + Math.random() * 90000).toString();
}

