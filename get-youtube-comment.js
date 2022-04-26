let params = {
  "key": PropertiesService.getScriptProperties().getProperty("API_KEY"),
  "sheetName": "コメントリスト",
  "max": 100,
};

const spSheet = SpreadsheetApp.getActiveSpreadsheet();
const srcSheet = spSheet.getSheetByName(params.sheetName);
const videoID = srcSheet.getRange(2,2).getValue().slice(32);

// メイン関数．
function getAllComments() {
  let nextPageToken = getFirstComment();
  console.log(nextPageToken);
  getAllCommentsIterater(nextPageToken);
}

// 繰り返しコメントを取得する．
function getAllCommentsIterater(pageToken){
    if(typeof pageToken !== 'undefined'){
      let nextPageToken = getComment(pageToken);
      getAllCommentsIterater(nextPageToken);
    }else{
      return;
    }
}

// [最初]コメントをAPIで取得する関数．
function getFirstComment(){
  const responseFirst = UrlFetchApp.fetch("https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=" + params.max + "&videoId=" + videoID + "&key=" + params.key);
  
  setComment(responseFirst);
  
  let nextPageToken = JSON.parse(responseFirst.getContentText()).nextPageToken;
  return nextPageToken;
}

// コメントをAPIで取得する関数．
function getComment(pageToken){
  const response = UrlFetchApp.fetch("https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet&maxResults=" + params.max + "&pageToken=" + pageToken + "&videoId=" + videoID + "&key=" + params.key);

  setComment(response);
  
  let nextPageToken = JSON.parse(response.getContentText()).nextPageToken;
  return nextPageToken;
}

// コメントを出力する関数．
function setComment(response){
  res = JSON.parse(response.getContentText());
  for(let i=0;i<params.max;i++) {
    let rowEnd = srcSheet.getDataRange().getLastRow();
    let rowStart = rowEnd + 1;
    
    if (typeof res.items[i] == 'undefined'){
      break;
    }else{
      let videoComment = res.items[i].snippet.topLevelComment.snippet.textDisplay;
      srcSheet.getRange(rowStart,2).setValue(videoComment);
      console.log(videoComment);
    }
  }
}
