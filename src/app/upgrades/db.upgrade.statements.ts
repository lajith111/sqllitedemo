export class DbUpgradeStatements {
  userUpgrades = [
    {
      toVersion: 1,
      statements: [
         `CREATE TABLE IF NOT EXISTS accounts(id INTEGER PRIMARY KEY AUTOINCREMENT,ain TEXT NOT NULL,customerName TEXT, openingDate TEXT, balance NUMERIC NOT NULL,  cin TEXT ,schemeCode TEXT,categoryCode TEXT,phoneNo TEXT,email TEXT,bankName TEXT,bankCode TEXT,bankRecieptName TEXT,branchName TEXT,branchCode,branchRecieptName TEXT,bin TEXT,lin TEXT,loanAmount NUMERIC,accountName TEXT,isLoan INT NOT NULL,nain TEXT,groupNo TEXT,closingBalanceDate TEXT,lastTransactionDate TEXT);`,
         `CREATE TABLE IF NOT EXISTS transactions(id INTEGER PRIMARY KEY AUTOINCREMENT,valueDate TEXT NOT NULL, amount NUMERIC,ain TEXT NOT NULL,balance NUMERIC NOT NULL,recieptTypeId NUMERIC NOT NULL,schemeCode TEXT);`,
         `CREATE TABLE IF NOT EXISTS logs(id INTEGER PRIMARY KEY, lastUpdatedDate TEXT NOT NULL);`
    ]
    },
    /* add new statements below for next database version when required*/
    /*
    {
      toVersion: 2,
      statements: [
        `ALTER TABLE users ADD COLUMN email TEXT;`,
      ]
    }
    */
  ]
}
