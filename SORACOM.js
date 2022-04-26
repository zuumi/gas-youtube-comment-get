function getAccessToken() {
  var apiInfo = Soracom.samUserAuthentication({
    "operatorId": PropertiesService.getScriptProperties().getProperty("SORACOM_OPERATORID"),
    "userName": PropertiesService.getScriptProperties().getProperty("SORACOM_SAM_USERNAME"),
    "password": PropertiesService.getScriptProperties().getProperty("SORACOM_SAM_PASSWORD"),
    "apiTokenIssued": PropertiesService.getUserProperties().getProperty("SORACOM_API_TOKEN_ISSUED")
  });

  if (apiInfo !== true) {
    Logger.log("New token");

    PropertiesService.getUserProperties().setProperty("SORACOM_API_KEY", apiInfo.apiKey);
    PropertiesService.getUserProperties().setProperty("SORACOM_API_TOKEN", apiInfo.token);
    PropertiesService.getUserProperties().setProperty("SORACOM_API_TOKEN_ISSUED", apiInfo.dateAndTime); // YYYY/MM/DD HH:mm:ss

    return {
      "key": apiInfo.apiKey,
      "token": apiInfo.token
    };
  }
  else {
    Logger.log("Exist token");
    return {
      "key": PropertiesService.getUserProperties().getProperty("SORACOM_API_KEY"),
      "token": PropertiesService.getUserProperties().getProperty("SORACOM_API_TOKEN")
    };
  }
}