import { generateCorpCode, generateCustcode } from "../utils/generateVa.js";

let vaStore = []; // In-memory store for virtual accounts

export const createVirtualAccount = (corp_code, cust_code, amount) => {
    const corpCode = generateCorpCode();
    const custCode = generateCustcode();
    const vaNumber = `${corp_code}${cust_code}`;

    const newVa = {
        vaNumber,
        corpCode,
        custCode,
        amount,
        status: 'active',
        createdAt: new Date()
    };
    vaStore.push(newVa);
    return newVa;
}


export const inquiryVirtualAccount = (vaNumber) => {
    const vaDetails = vaStore.find(va => va.vaNumber === vaNumber);
    if(!vaDetails){
        throw new Error('Virtual account not found');
    }
    return vaDetails;
}

export const paymentVirtualAccount = (vaNumber, amount) => {
    const vaIndex = vaStore.findIndex(va => va.vaNumber === vaNumber);
    if(vaIndex === -1){
        throw new Error('Virtual account not found');
    }   
    if(vaStore[vaIndex].status !== 'active'){
        throw new Error('Virtual account is not active');
    }
    if(amount !== vaStore[vaIndex].amount){
        throw new Error('Insufficient payment amount');
    }
    vaStore[vaIndex].status = 'paid';
    vaStore[vaIndex].paidAt = new Date();
    return vaStore[vaIndex];
}
