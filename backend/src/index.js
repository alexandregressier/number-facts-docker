const express = require("express")
const index = express()
const router = express.Router()
const port = 3000

router.get("/hello", (req, res) => {
  res.send("Hello, world!")
})

index.use("/api", router)

index.listen(port, () => {
  console.log(`Backend started at http://localhost:${port}`)
})