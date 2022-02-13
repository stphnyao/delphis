import { ChakraProvider } from "@chakra-ui/react"

import Home from "./index"

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Home {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
