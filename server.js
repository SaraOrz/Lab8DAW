const exp = require("constants")
var express = require("express")
const res = require("express/lib/response")
var path = require("path")

var app = express()
var port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true}))
app.use(express.json())


var waitlist = []
var reservations = []

const maxTables = 5
var currentTables = reservations.length

app.listen(port, () => console.log(`Server listening on ${port}`))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/pages/home.html"))
})

app.get("/tables", (req, res) => {
    res.sendFile(path.join(__dirname, "/pages/tables.html"))
})

app.get("/reserve", (req, res) => {
    res.sendFile(path.join(__dirname, "/pages/reserve.html"))
})

app.get("/api/waitlist", (req, res) => {
    return res.json(waitlist)
})

app.get("/api/tables", (req, res) => {
    return res.json(reservations)
})

app.post("/api/tables", (req, res) => {
    console.log("Received: ", req.body)

    let newReservation = req.body
    if (currentTables < maxTables) {
        currentTables++;
        reservations.push(newReservation)
        res.json ({
            type: "success",
            message: "Reservation done successfully"
        })
    } else {
        waitlist.push(newReservation)
        res.json ({
            type: "failure",
            message: "There are no more tables available, you have been added to the waitlist."
        })
    }
    console.log("Number of tables available: ", currentTables)
})

app.post("/api/clear", (req, res) => {
    reservations =[]
    waitlist = []
    currentTables = 0
    return res.json({ result: "success" })
})




