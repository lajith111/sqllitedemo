export interface IAccountResponse {
    id?: string;
    ain?:string;
    openingDate?:Date;
    balance?:number;
    customerName?: string;
    cin?:string;
    categoryCode?: string;
    schemeCode?: string;
    phoneNo?: string; 
    email?: string;
    branch?:IBranchResponse;
    lin?:string;
    loanAmount?:number; 
    accountName?:string;
    isLoan:boolean;
    nain?:string;
    groupNo?:string;
    closingBalanceDate?:Date;
    lastTransactionDate?:Date;
}
export interface IBranchResponse {
    id?: string ;
    name?: string;
    recieptName?: string;
    bin?:string;
    code?: string;
    address1?: string;
    address2?: string;
    address3?: string ;
    fullAddress?: string;
    branchTypeId?:number;
    bank?:IBankResponse;
}


export interface IBankResponse {
    id?: string; 
    name?: string;
    prefixUserName?:string;
    recieptName?: string;
    code?: string; 
    address1?: string;
    address2?: string;
    address3?: string;
    fullAddress?: string;
    dltName?: string;
}
