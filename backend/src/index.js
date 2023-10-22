const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
const router = express.Router()
const port = process.env.PORT || 3000

const redis = require("redis")
const redisHost = process.env.REDIS_HOST || "localhost"
const redisPort = process.env.REDIS_PORT || 6379
const client = redis.createClient({url: `redis://${redisHost}:${redisPort}`})

router.get("/facts/:number", async (req, res) => {
  const number = req.params.number

  try {
    const result = await client.get(number)
    if (result) {
      console.log(`Retrieved number fact for ${number} from Redis`)
      res.json({
        number: number,
        fact: result,
      })
    } else {
      const response = await fetch(`http://numbersapi.com/${number}`)
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status} while retrieving number fact for ${number}`)
      }
      const result = await response.text()
      await client.set(number, result)
      console.log(`Retrieved number fact for ${number} from API.`)
      res.json({
        number: number,
        fact: result,
      })
    }
  } catch (error) {
    res.json({
      message: `Error retrieving number fact for ${number}.`,
      error: error.toString(),
    })
  }
})

app.use("/api", router)

app.listen(port, async () => {
  console.log(`Connecting to Redis at redis://${redisHost}:${redisPort}…`)
  await client.connect();
  console.log("Connected to Redis.")
  console.log(`Backend started at http://localhost:${port}`)
})