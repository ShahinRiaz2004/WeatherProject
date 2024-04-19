



const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.cityName;
  const apiKey = "6480ee48cc27a5b90ff78d8af79d3a0c";
  const units = "metric"; // change from unit to units
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units; // corrected URL
  https.get(url, function (response) {
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The weather is currently " + weatherDescription + "</p>"); // corrected closing tag
      res.write("<h1>The temperature here is " + temp + " degrees Celsius</h1>"); // corrected spelling of Celsius
      res.write("<img src='" + imageURL + "'>"); // added single quotes around the src attribute value
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("running");
});












// const express = require("express");
// const https = require("https");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });
//   app.post("/", function (req, res) {

//     const query = req.body.cityName;
//     const apiKey = " 6480ee48cc27a5b90ff78d8af79d3a0c";
//     const units = "metric";
//     const url = "https://api.openweathermap.org/data/2.5/weather?&q=" + query +" &appid=" +apiKey +"&unit=" +units;
//     https.get(url, function (response) {
//       console.log(response.statusCode);

//       response.on("data", function (data) {
//         const weatherData = JSON.parse(data);
//         const temp = weatherData.main.temp;
//         const weatherDescription = weatherData.weather[0].description;
//         const icon = weatherData.weather[0].icon;
//         const imageURL ="https://openweathermap.org/img/wn/" + icon + "@2x.png";
//         res.write("<p>The weather is currently " + weatherDescription + "<p>");
//         res.write("<h1>The temperature herat is " + temp + "degrees Cilcuse</h1>");
//         res.write("<img src=" + imageURL + ">");
//         res.send();
//     });
//   });
// });

// app.listen(3000, function () {
//   console.log("running");
// });

