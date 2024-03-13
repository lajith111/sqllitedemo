
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ToastService} from 'src/app/services/toast.service';
import { DatePipe } from '@angular/common';
import { ILog } from '../shared/models/log/log';
import { DbUpgradeStatements } from '../upgrades/db.upgrade.statements';
import { capSQLiteSet, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { SQLiteService } from './sqlite.service';
import { DbnameVersionService } from './dbname-version.service';
import { AlertService } from './alert.service';
import { IAccountResponse } from '../shared/models/log/accounts';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  private databaseName: string = "";
  private dbUpdStmts: DbUpgradeStatements = new DbUpgradeStatements();
  private versionUpgrades;
  private loadToVersion;
  private db!: SQLiteDBConnection;

  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private accountList : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private transactionList: BehaviorSubject<any[]>= new BehaviorSubject<any[]>([]);
  private logs = new BehaviorSubject<ILog[]>([]);


  constructor(private sqliteService: SQLiteService,
    private dbVerService: DbnameVersionService,private alertService: AlertService,
    private datePipe: DatePipe,private toastService: ToastService) {
      this.versionUpgrades = this.dbUpdStmts.userUpgrades;
      this.loadToVersion = this.versionUpgrades[this.versionUpgrades.length-1].toVersion;
    }
    
    async initializeDatabase(dbName: string) {

      try{

      this.databaseName = dbName;
      // create upgrade statements
      await this.sqliteService
        .addUpgradeStatement({  database: this.databaseName,
                                upgrade: this.versionUpgrades});
      // create and/or open the database
      this.db = await this.sqliteService.openDatabase(this.databaseName,
                                            false,
                                            'no-encryption',
                                            this.loadToVersion,
                                            false
      );
      
      this.dbVerService.set(this.databaseName,this.loadToVersion);
  
      await this.loadAccounts();
      await this.loadLogs();
      this.dbReady.next(true);
    } catch(err)
    {
      this.toastService.presentErrorToast(err);
    }
  }


  dbState() {
    return this.dbReady.asObservable();
  }

  
  getAccounts(): Observable<IAccountResponse[]> {

    return this.accountList.asObservable();
  }

  getTransactions(): Observable<any[]> {
    return this.transactionList.asObservable();
  }

  getLogs(): Observable<ILog[]> {
    return this.logs.asObservable();
  }


  
 async loadAccounts() {    

  const users: any[]= (await this.db.query('SELECT * FROM users;')).values as IAccountResponse[];
  this.accountList.next(users);
}

  
  async loadLogs() {
 
    const query = 'SELECT id,lastUpdatedDate FROM logs;';
    const data = (await this.db.query(query)).values;
    let logs: ILog[] = [];
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        logs.push({
          id: data[i].id,
          lastUpdatedDate: data[i].lastUpdatedDate,
        });
      }
  }

  this.logs.next(logs);
  //console.log(`>>> Log: ${JSON.stringify(logs)}`)
}





async importAccountsTransaction(accounts: IAccountResponse[]) {

  const txn: any[] = [];
 

  debugger
  const query1= 'DELETE FROM accounts;';
  const query2 = `INSERT INTO accounts(ain,cin,openingDate,balance,customerName,schemeCode,
                categoryCode,phoneNo,email,bankName,bankCode,branchName,branchCode,bankRecieptName,
                branchRecieptName,lin,loanAmount,accountName,isLoan,nain,groupNo,closingBalanceDate,lastTransactionDate) 
                VALUES (?, ?, ?, ? ,? , ?, ?, ?, ? , ?, ?, ?, ? ,? ,?, ?, ? ,? ,?,?,?,?,?);`;
  const query3 = 'DELETE from logs WHERE id = ?;';

  txn.push({statement: query1});

  for(let i=0;i<accounts.length;i++){ 
    
    const values=[accounts[i].ain,accounts[i].cin,accounts[i].openingDate,accounts[i].balance, accounts[i].customerName,accounts[i].schemeCode,accounts[i].categoryCode,accounts[i].phoneNo,accounts[i].email,accounts[i].branch.name,accounts[i].branch.code,accounts[i].branch.bank.name,accounts[i].branch.bank.code,accounts[i].branch.bank.recieptName,accounts[i].branch.recieptName,accounts[i].lin,accounts[i].loanAmount,accounts[i].accountName,accounts[i].isLoan==true?1:0,accounts[i].nain,accounts[i].groupNo ,accounts[i].closingBalanceDate,accounts[i].lastTransactionDate];
  
    txn.push({statement: query2, values: values});
  }

  
  txn.push({statement: query3, values: [1]}); //1- Download
  try{
    const ret = await this.db.executeTransaction(txn);
  
  }
  catch(err:any) {
    const msg = err.message ? err.message : err;
    console.log(`Test Issue523 Transaction msg: ${msg}`)
   

  } finally {

    
    // let selectQuery = "SELECT * FROM accounts;";
    // const retQuery = await this.db.query(selectQuery);
    // console.log(`>>> query All retQuery4: ${JSON.stringify(retQuery)}`)
    await this.loadAccounts();
    await this.loadLogs();
  }
}
async importAccountsTest() {

  debugger
  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const generateRandomName = (pattern: string) => {
    return pattern.replace(/X/g, () => String.fromCharCode(65 + Math.floor(Math.random() * 26)));
  }

   // setLog(prevLog => prevLog + '### Start Test Transaction Issue 523 ###\n');
    if (this.db !== null) {
      const txn: any[] = [];
      txn.push({statement:'DELETE FROM accounts;'});
      const stmt523 = `INSERT INTO accounts 
      (ain,cin,openingDate,balance,customerName,schemeCode,categoryCode,phoneNo,
      email,bankName,bankCode,branchName,branchCode,bankRecieptName,branchRecieptName,bin,
      lin,loanAmount,accountName,isLoan,nain,groupNo,closingBalanceDate,lastTransactionDate)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;

      const values =
          ["000000000000338","01401000338","2023-04-05T18:30:00Z",28030,"SAYAD SAHIL","12","","9036986909",
          null,"Manipal","Demo","Demo Society",null,"Samaja Seva S S","Demo",null,
          null,0,null,0,null,null,"2024-02-26T18:30:00Z","2024-02-25T18:30:00Z"];
      txn.push({statement: stmt523, values: values});
      for (let i=1; i<1000; i++ ) {
        const val = getRandomNumber(100, 999);
        values[0] = `000000000000${val}`;
        values[1] = `01401000${val}`;
        values[3] = getRandomNumber(100, 100000);
        values[4] = generateRandomName("XXXXX XXXXX");
        values[7] = (getRandomNumber(9000000000, 9999999999)).toString();

        txn.push({statement: stmt523, values: values});
      }
      txn.push({statement: "DELETE from logs WHERE id = ?;", values: [1]}); //1- Download
      try {
        const ret = await this.db.executeTransaction(txn);
        console.log(`Test Issue523 Transaction ret: ${JSON.stringify(ret)}`);
      //  setLog(prevLog => prevLog + '### Test Issue523 successfull###\n');

      } catch(err:any) {
        const msg = err.message ? err.message : err;
        console.log(`Test Issue523 Transaction msg: ${msg}`)
//setLog(prevLog => prevLog + `### Test Issue523  failed : ${msg} ###\n`);

      } finally {
        let selectQuery = "SELECT * FROM accounts;";
        const retQuery = await this.db.query(selectQuery);
        console.log(`>>> query All retQuery4: ${JSON.stringify(retQuery)}`)
       // setLog(prevLog => prevLog + '### End Test Issue523 Transaction ###\n');
       await this.loadAccounts();
       await this.loadLogs();
      }
    
  }

  
}

async initiateLog(id: number,dt: string) {

   try{
  
     const query = 'INSERT INTO logs (id,lastUpdatedDate) VALUES (?,?) ON CONFLICT(id) DO UPDATE SET lastUpdatedDate=?;';
 
     await this.db.run(query,[id,dt,dt]);
     this.alertService.presentAlert("Log","Log insert");

     await this.loadLogs();
   }
   catch(err)
   {
    this.toastService.presentErrorToast(err);
    console.log(err)
   }
 
 }

async clearAccounts() {
    
    try{
      const id=1;  //1- Download
    
      const query1 = 'DELETE FROM accounts;';
      const query2= 'DELETE from logs WHERE id = ?;';
      const transaction: Array<capSQLiteSet>  = [
        {statement: query1,values:[] },
        {statement: query2,values: [id]}
      ]

      await this.db.executeSet(transaction,true);
      await this.loadLogs();
      await this.loadAccounts();

    }catch(err){console.log(err)}
 }

  async clearDownlodLogs() {
  
      const id=1;  //1- Download
      const query = 'DELETE from logs WHERE id = ?;';
    
      const transaction: any = [
        {statement: query,values: [id]}
      ]
      await this.db.executeSet(transaction,true);
      await this.loadLogs();
                   
  }
  
 }

