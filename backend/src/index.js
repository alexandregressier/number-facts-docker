const express = require("express")
const index = express()
const router = express.Router()
const port = 3000

router.get("/facts/:number", async (req, res) => {
  const number = req.params.number

  try {
    const response = await fetch(`http://numbersapi.com/${number}`)
    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status} while retrieving number fact for ${number}`)
    }
    const data = await response.text()
    res.json({
      number: number,
      fact: data,
    })
  } catch (error) {
    res.json({
      message: `Error retrieving number fact for ${number}`,
      error: error.toString(),
    })
  }
})

index.use("/api", router)

index.listen(port, () => {
  console.log(`Backend started at http://localhost:${port}`)
})