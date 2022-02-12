import { ChakraProvider } from "@chakra-ui/react"
import Home from './index'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Home {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
