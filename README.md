# PanControl-Google-Apps-Script
The Google Apps Script of the PanControl

## usage
### read data
#### Get whole table
paramenter:
    string TableName

return:
    All data in the table using JSON

    if table doesn't exist:
        return "沒有這個表，檢查一下你的 TableName 吧"

example:
    GET:https://script.google.com/macros/s/AKfycbzVKZ-jEFprUbzu0v2OMyJmFh8QxFjhNXgO5_297qs/dev?TableName=CardInfo
    return:
        [{"ID":"1","CardNumber":"1254120452","Owner":"fgh","CardTypeID":"3","TeamID":"null","CreatedTime":"20180415194815","IsActive":"1"},{"ID":"2","CardNumber":"0000000002","Owner":"asd","CardTypeID":"2","TeamID":"4","CreatedTime":"20180415194827","IsActive":"1"},{"ID":"3","CardNumber":"0084054846","Owner":"ffyfyf","CardTypeID":"3","TeamID":"3","CreatedTime":"20180415195454","IsActive":"1"},{"ID":"4","CardNumber":"0000051564","Owner":"lkjkj","CardTypeID":"3","TeamID":"5","CreatedTime":"20180415200248","IsActive":"1"},{"ID":"5","CardNumber":"5566233215","Owner":"5566","CardTypeID":"3","TeamID":"null","CreatedTime":"20180415215037","IsActive":"1"},{"ID":"6","CardNumber":"0000000670","Owner":"670","CardTypeID":"666","TeamID":"null","CreatedTime":"20180415215547","IsActive":"1"},{"ID":"7","CardNumber":"0000000055","Owner":"670","CardTypeID":"666","TeamID":"null","CreatedTime":"20180415215636","IsActive":"0"},{"ID":"8","CardNumber":"0000000066","Owner":"66","CardTypeID":"666","TeamID":"null","CreatedTime":"20180415215832","IsActive":"1"}]

#### Check if Card ID exist in database && active
paramenter:
    string TableName
    string CardNumber

return:
    0 or 1

example:
    GET:https://script.google.com/macros/s/AKfycbzVKZ-jEFprUbzu0v2OMyJmFh8QxFjhNXgO5_297qs/dev?TableName=CardInfo&CardNumber=0000000066
    return:
        1

#### Get the reserve data using Card ID
paramenter:
    string TableName
    string CardNumber

return:
    All reserve data pass the examined with the Card ID

    if Card ID doesn't exist or no reserve data:
        return "無資料"

example:
    GET:https://script.google.com/macros/s/AKfycbzVKZ-jEFprUbzu0v2OMyJmFh8QxFjhNXgO5_297qs/dev?TableName=Reservation&CardNumber=0000000002
    return:
        [{"ID":"5","CardNumber":"0000000002","StartTime":"20180416080000","EndTime":"20180416230000","Approved":"1"},{"ID":"2","CardNumber":"0000000002","StartTime":"20180416080000","EndTime":"20180416230000","Approved":"1"}]

### write data
post
parameter:in main.gs line: 50 AddData function
```
function AddData(para)
{
  // 前面要有個隱藏欄位(hidden)傳 TableName
  var tableName = para.TableName;
  if(tableName == null){
    return "沒有 TableName！";
  }
  
  // 各頁所傳的資料陣列，用 switch 去對應方法撈出來
  var dataArray;
  
  switch(tableName)
  {
    case "CardInfo":
      dataArray = ReturnCardInfoData(para);
      break;
    case "CardType":
      dataArray = ReturnCardTypeData(para);
      break;
    case "Team":
      dataArray = ReturnTeamData(para);
      break;
    case "Machine":
      dataArray = ReturnMachineData(para);
      break;
    case "Record":
      dataArray = ReturnRecordData(para);
      break;
    default:
      return "沒有這個表，檢查一下你的 TableName 吧";
  }
```

