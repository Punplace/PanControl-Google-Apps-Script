# PanControl-Google-Apps-Script
The Google Apps Script of the PanControl

## useage
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
### read data
Get

