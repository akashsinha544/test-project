const express = require("express");
const app = express();


app.use('/univ/users', require("./routes/users"))

app.listen(8080, () =>{
    console.log("Listening on port 8080")
})