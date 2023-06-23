const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const { log, error } = require('console');
const app = express();
const url1 = "http://127.0.0.1:8000/";
// getting icon url as well
const axios = require('axios');
const FormData = require('form-data')
const session = require('express-session');
app.use(bodyParser.urlencoded({ extended: true }));


const new_data = new URLSearchParams();
new_data.append('grant_type', 'password');
new_data.append('username', 'namsoprince@gmail.com');
new_data.append('password', 'pass123');
new_data.append('scope', 'optional-scopes');

// console.log(data);

app.use(session({
    secret: '09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7',
    resave: false,
    saveUninitialized: true
}));
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")

});
//res.send can be sent only once. remeber https working

// res.sendFile(__dirname +"/index.html")

app.post('/', async (req, res) => {
    var1 = req.body.cityName;
    const query = var1;
    http.get(url1, (response) => {
        let data = ''
        // console.log(response)
        response.on("data", (chunk) => {

            data += chunk;
        });
        response.on('end', () => {
            var weatherData = JSON.parse(data);
            console.log(weatherData);
        })
        // const icon=weatherData.weather[0].icon;
        // const imagrUrl="https://openweathermap.org/img/wn/"+icon+"@2x.png";
        // const weatherDescription=weatherData.weather[0].description;
        // res.send("Temperature is : "+weatherData.main.temp +"<img src="+imagrUrl+">"  );
        // console.log(weatherData);
        // console.log(weatherData.main.temp)
    })
    // const data=JSON.stringify({
    //     title: "Robin",
    //     content : "lorem epsom generate content"
    // });
    //     //res.write(weatherData.main.temp);
    //     const url2="http://127.0.0.1:8000/posts/";

    //     const options = {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'Content-Length': data.length
    //         }
    //       };

    //        const rqst=http.request(url2, options, (res) => {
    //         let responseData = '';

    //         res.on('data', (chunk) => {
    //           responseData += chunk;
    //         });

    //         res.on('end', () => {
    //           console.log(responseData); // Assuming the response is in plain text or JSON format
    //         });
    //       });

    //       rqst.on('error', (error) => {
    //         console.error('Error:', error.message);
    //       });

    //       rqst.write(data);
    //       rqst.end();


        let t;
        try {
          const url3 = "http://127.0.0.1:8000/login/";
          const response = await axios.post(url3, new_data);
           t = response.data.access_token;
           req.session.token = t;
          console.log(t);
          // Continue processing or return a response
          res.sendStatus(200);
        } catch (error) {
          // Handle errors
          console.error(error);
          res.sendStatus(500);
        }
      });
  // console.log(t);
app.get("/login", (req, res) => {
    // url3="http://127.0.0.1:8000/login/"
    //     axios.post(url3, new_data)
    //     .then((response) => {
    //       // Handle the response
    //      t=`${response.data.access_token}`

    //      res.send(t)
    //       const accessToken = t; // Replace with your access token
    let t;
    t = req.session.token
    console.log(t);
    const headers = {
        'Authorization': `Bearer ${t}`
    };
    const url4 = "http://127.0.0.1:8000/posts/"
    axios.get(url4, { headers })
        .then((response) => {
            // Handle the response
            console.log(response.data);
            //res.send(response.data)
        })
        .catch((error) => {
            // Handle errors
            console.error("error");
        });
})







app.listen(3000, () => console.log("Server Started!"));