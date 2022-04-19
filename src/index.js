const express = require("express");
const app = express();
app.use(express.json())

app.use("/univ/users", require("./routes/users"))
app.use("/univ/courses", require("./routes/courses"))
app.use("/univ/tests", require("./routes/test_paper"))

app.listen(8080, () =>{
    console.log("Listening on port 8080")
})