import "./App.css"
import {useEffect, useState} from "react"

const apiUrl = "http://localhost:3000/api"

function App() {
  const [fact, setFact] = useState("")
  let number = window.location.pathname.split("/").pop()

  useEffect(() => {
    async function fetchFact() {
      if (number) {
        try {
          const response = await fetch(`${apiUrl}/facts/${number}}`)
          if (!response.ok) {
            throw new Error(`HTTP Error ${response.status} while retrieving number fact for ${number}`)
          }
          const result = await response.json()
          setFact(result.fact)
        } catch (error) {
          console.error("Error while fetching number fact from API.", error)
          setFact("Error! Please try again.")
        }
      } else {
        setFact("Please provide a number in the URL.")
      }
    }
    fetchFact()
  }, [number])

  return <>
    <h1>
      {fact ? fact : "Loading…"}
    </h1>
  </>
}

export default App
