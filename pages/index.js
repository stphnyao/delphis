import Head from "next/head"
import { ChakraProvider, Container, Center, Button } from "@chakra-ui/react"
import Link from "next/link"
import React, { useEffect, useState } from "react"
// import twitterLogo from "./assets/twitter-logo.svg"

const Home = () => {
  const TEST_GIFS = [
    "https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp",
    "https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g",
    "https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g",
    "https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp",
  ]
  const [walletAddress, setWalletAddress] = useState(null)
  const [inputValue, setInputValue] = useState("")
  const [gifList, setGifList] = useState([])
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window

      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found!")
          const response = await solana.connect({ onlyIfTrusted: true })
          console.log(
            "Connected with Public Key:",
            response.publicKey.toString()
          )

          /*
           * Set the user's publicKey in state to be used later!
           */
          setWalletAddress(response.publicKey.toString())
        }
      } else {
        alert("Solana object not found! Get a Phantom Wallet 👻")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const connectWallet = async () => {
    const { solana } = window

    if (solana) {
      const response = await solana.connect()
      console.log("Connected with Public Key:", response.publicKey.toString())
      setWalletAddress(response.publicKey.toString())
    }
  }

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log("Gif link:", inputValue)
      setGifList([...gifList, inputValue])
      setInputValue("")
    } else {
      console.log("Empty input. Try again.")
    }
  }

  const onInputChange = (event) => {
    const { value } = event.target
    setInputValue(value)
  }

  const renderNotConnectedContainer = () => (
    <Button onClick={connectWallet}>Connect to Wallet</Button>
  )

 const renderConnectedContainer = () => (
   <div className="connected-container">
     <form
       onSubmit={(event) => {
         event.preventDefault()
         sendGif()
       }}
     >
       <input
         type="text"
         placeholder="Enter gif link!"
         value={inputValue}
         onChange={onInputChange}
       />
       <button type="submit" className="cta-button submit-gif-button">
         Submit
       </button>
     </form>
     <div className="gif-grid">
       {/* Map through gifList instead of TEST_GIFS */}
       {gifList.map((gif) => (
         <div className="gif-item" key={gif}>
           <img src={gif} alt={gif} />
         </div>
       ))}
     </div>
   </div>
 )


  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected()
    }
    window.addEventListener("load", onLoad)
    return () => window.removeEventListener("load", onLoad)
  }, [])

  useEffect(() => {
    if (walletAddress) {
      console.log("Fetching GIF list...")

      // Call Solana program here.

      // Set state
      setGifList(TEST_GIFS)
    }
  }, [walletAddress])

  return (
    <ChakraProvider>
      <Container centerContent>
        <Center>
          <Head>
            <title>Delphis</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <h1 className="title">
              Welcome to <a href="/">Delphis</a>
            </h1>

            <p className="description">
              Get started by connecting your Solana Wallet!
            </p>
            {!walletAddress && renderNotConnectedContainer()}
            {walletAddress && renderConnectedContainer()}
          </main>

        </Center>
      </Container>
      <Container centerContent>
        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by <img src="/vercel.svg" alt="Vercel" className="logo" />
          </a>
        </footer>
      </Container>
    </ChakraProvider>
  )
}

export default Home
