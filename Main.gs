var _db = SpreadsheetApp.getActiveSpreadsheet(); //取得資料庫(對應的 GoogleSheet)


// 初始化，網址後面得加上 ?PageName=頁名 ，即可回傳對應的值或 html 頁面
function doGet(e)
{
  // Logger.log( Utilities.jsonStringify(e) );
  // return ContentService.createTextOutput(Utilities.jsonStringify(e));
  
  var pageName = e.parameter.PageName;
  
  
  if (pageName == null) {
    return ContentService.createTextOutput("請在網址後傳送 PageName, 注意大小寫XD");
  }
  else{
    var htmlTemplate = HtmlService.createTemplateFromFile(pageName);
    
    // 還可以直接塞給這頁變數，神奇的寫法..
    // <form>的action，有點像是要送出的位址，這邊放"最新的程式碼測試 網路應用程式網址"
    htmlTemplate.actionUrl = "https://script.google.com/macros/s/AKfycbz46PadqPv4C4F91evN9LaR8evKg-iOgn5VzoNHdFM/dev";
    
    // htmlTemplate.actionUrl = "https://script.google.com/macros/s/AKfycbyu5QsO0fHaBZQ84m4u_zCBnZqMRa9UxOv0KsQyScwQ8gT7Y2Y/exec";
    // OS:網址後面的/dev與/exec 可以想成兩個 Web App
    // 開發執行最新程式碼是dev那個，隨時更新隨時變動
    // exec那個只有 **發佈+新增版本** 才會變動
    // 結論！用dev那串比較省事...，然後 GoogleSite 連結要用exec
    
    return htmlTemplate.evaluate();
  }
  
}



// 按下送出，會執行這裡
function doPost(e)
{
  // e.parameter 裡存放所有傳送的參數
  var result = AddData(e.parameter);
  
  return ContentService.createTextOutput(result);
}



// 新增資料
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
  
  var table = _db.getSheetByName(tableName);
  
  // 用上一格去生id
  var id = table.getRange(table.getLastRow(), 1).getValue() + 1;
  
  // 把 id 加到陣列第一個
  dataArray.unshift(id);
  
  // 插入一列新的資料 
  table.appendRow(dataArray);
  
  // 卡號，前面是0時會被切掉，因為 appendRow 是新增一筆，所以不會照原本的儲存格格式
  // 因此多一步把卡號那格 格式化，剛好都在B欄所以取B最後一格
  if(para.CardNumber != null){
    var cell = table.getRange("B" + table.getLastRow());
    cell.setNumberFormat("0000000000");
    cell.setNumberFormat("@"); //純文字
  }
  else{
    Logger.log("para.CardNumber != null");
  }
  
  return "已成功新增~~~";
}


// 嵌入頁面，重複程式碼可用，但有gs的不行，因為是 HtmlOutput 而不是 Template
// 官方範例是用於把 css 和 javaScript 抽出去
function Include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
  // 使用：<?!= Include('Stylesheet'); ?>
}


// 下拉選單取資料副程式
// <sheetName> 表的名稱
function getOptionData(tableName)
{
  var table = _db.getSheetByName(tableName);
  
  var startRow = table.getFrozenRows() + 1, //開始列
      startColumn = 1, //開始欄
      columnLength = 2, //取2欄就好，[key, value]
      rowLength = table.getLastRow() - table.getFrozenRows(); //總列數

  var data = table.getRange(startRow, startColumn, rowLength, columnLength).getValues();
  var data2 = table.getRange(startRow, startColumn, rowLength, columnLength).getValue();
  Logger.log("data:"+data);
  Logger.log("data2:"+data2);
  
  
  return data;
}




function ComposeDateTimeString(datetime){
  dateTime = new Date(datetime);
  
  var yyyy = dateTime.getFullYear();
  var MM = PrependZero(dateTime.getMonth()+1); //January is 0!
  var dd = PrependZero(dateTime.getDate());
  var HH = PrependZero(dateTime.getHours());
  var mm = PrependZero(dateTime.getMinutes());
  var ss = PrependZero(dateTime.getSeconds());
  
  var dateTimeString = yyyy + MM + dd + HH + mm + ss;
  //Logger.log(dateTimeString);
  
  return dateTimeString;
}

function PrependZero(value){
  if(value < 10){
    value = '0' + value;
  }
  return value;
}



