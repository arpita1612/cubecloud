
/*
docker run --rm --name TsData -e CUBEJS_API_SECRET=e0cfdd622c35b2215e623462f8521089093c7769720be2da29a5e920d8431099059e77c42ec6783370eaef467e473fedebebbd6313004a25e5a6592fc0881698 -e CUBEJS_DB_HOST=DESKTOP-U8UM164 -e CUBEJS_DB_NAME=user -e CUBEJS_DB_USER=sa -e CUBEJS_DB_PASS=database@1 -e CUBEJS_DB_TYPE=mssql -v "/c/Program Files/...:/cube/conf" cubejs/cube:latest
  
  CUBEJS_DB_HOST=DESKTOP-U8UM164
CUBEJS_DB_NAME=user
CUBEJS_DB_PORT=1433
CUBEJS_DB_USER=sa
CUBEJS_DB_PASS=database@1
CUBEJS_DEV_MODE=true
CUBEJS_DB_TYPE=mssql
CUBEJS_API_SECRET=e0cfdd622c35b2215e623462f8521089093c7769720be2da29a5e920d8431099059e77c42ec6783370eaef467e473fedebebbd6313004a25e5a6592fc0881698

heroku config:set CUBEJS_DB_TYPE=mssql CUBEJS_DB_HOST=DESKTOP-U8UM164 CUBEJS_DB_NAME=user CUBEJS_DB_USER=sa CUBEJS_DB_PASS=database@1 CUBEJS_API_SECRET=e0cfdd622c35b2215e623462f8521089093c7769720be2da29a5e920d8431099059e77c42ec6783370eaef467e473fedebebbd6313004a25e5a6592fc0881698 --app real-time-dashboard-api
*/


cube(`TSData`, {
  sql: `SELECT * FROM dbo."TSData"`,
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [activityname, bugid, projectname, clientname, transactiondate]
    },
    MonthWeekNoSum: {
      type: `sum`,
      sql : 'MonthWeekNo'
    },
    ProjectCount: {
      type: `count`,
      sql : 'ProjectID'
    },
    IntEquivalent: {
      type: `sum`,
      sql : `IntEquivalent`,
      // drillMembers: [bugid, MonthYear , IntEquivalent]
    },
    MonthYear: {
      type: `count`,
      sql : 'MonthYear'
    },

    Employee :{
      type: `count`,
      sql : 'EmployeeID'
    }
  },
  
  dimensions: {
    activityname: {
      sql: `${CUBE}."ActivityName"`,
      type: `string`
    },
    EmployeeID :{
      sql: `${CUBE}."EmployeeID"`,
      type: `string`
    },
    bugid: {
      sql: `${CUBE}."BugId"`,
      type: `string`
    },
    
    transactiontime: {
      sql: `${CUBE}."TransactionTime"`,
      type: `string`
    },
    
    intequivalent: {
      sql: `${CUBE}."IntEquivalent"`,
      type: `string`
    },
    
    monthyear: {
      sql: `${CUBE}."MonthYear"`,
      type: `string`
    },
    
    projectname: {
      sql: `${CUBE}."ProjectName"`,
      type: `string`
    },
    
    clientname: {
      sql: `${CUBE}."ClientName"`,
      type: `string`
    },
    
    submittedby: {
      sql: `${CUBE}."SubmittedBy"`,
      type: `string`
    },
    
    employeeemail: {
      sql: `${CUBE}."EmployeeEmail"`,
      type: `string`
    },
    
    projectmanager: {
      sql: `${CUBE}."ProjectManager"`,
      type: `string`
    },
    
    pmemail: {
      sql: `${CUBE}."PMEmail"`,
      type: `string`
    },
    
    timesheetapprovedby: {
      sql: `${CUBE}."TimesheetApprovedBy"`,
      type: `string`
    },
    
    jobnumber: {
      sql: `${CUBE}."JobNumber"`,
      type: `string`
    },
    
    transactiondate: {
      sql: `${CUBE}."TransactionDate"`,
      type: `time`
    },
    
    projectstart: {
      sql: `${CUBE}."ProjectStart"`,
      type: `time`
    },
    
    projectend: {
      sql: `${CUBE}."ProjectEnd"`,
      type: `time`
    },

 
  },
  
  dataSource: `default`
});
