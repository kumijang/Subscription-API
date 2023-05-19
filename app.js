const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https")

const app = express();

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", (req,res) => {
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email
    
    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us18.api.mailchimp.com/3.0/lists/aa662b3b1a"

    const option = {
        method: "POST",
        auth: "sky:06dffd0f1ec3e971bfe32264f19*********"
    }
   const request = https.request(url, option, (response) => {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html")
        }
    
    
    
    
    
    
    request.on("data", (data) => {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData)
    request.end();

})

app.post("/failure", (req,res) => {
    res.redirect("/")
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
})


// api key: c54492c9fe87786aa9c6355bca9690e1-us18 
// Typically, this is what they want: aa662b3b1a.
