// 取得卡片資料，網頁端有用到
function getCardData()
{
  return getOptionData("CardInfo");
}


// 取得機器資料，網頁端有用到
function getMachineData()
{
  return getOptionData("Machine");
}


// 回傳 Record 資料陣列
function ReturnRecordData(para)
{
  var cardNumber = para.CardNumber,
      machineID = para.MachineID,
      startTime = ComposeDateTimeString(para.StartTime),
      endTime = ComposeDateTimeString(para.EndTime);
  
  return [cardNumber, machineID, startTime, endTime];
}
