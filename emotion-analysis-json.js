function summery(){
  const analysisSheet = spSheet.getSheetByName("感情分析");
  let file_name = "output.json";
  let file = DriveApp.getFilesByName(file_name).next();
  let textdata = file.getBlob().getDataAsString('utf8');
  let json_text = JSON.parse(textdata);
  let total_neutral = 0;
  let total_negative = 0;
  let total_mixed = 0;
  let total_positive = 0;
  
  for(i=0; i < Object.keys(json_text).length ;i++){
    total_neutral += json_text[i].SentimentScore.Neutral;
    total_negative += json_text[i].SentimentScore.Negative;
    total_mixed += json_text[i].SentimentScore.Mixed;
    total_positive += json_text[i].SentimentScore.Positive;
  }
  analysisSheet.getRange(2,2).setValue(total_neutral);
  analysisSheet.getRange(3,2).setValue(total_negative);
  analysisSheet.getRange(4,2).setValue(total_mixed);
  analysisSheet.getRange(5,2).setValue(total_positive);
}




