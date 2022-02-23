import '../styles/globals.css'
import { AppWrapper } from '../context/AppContext'
import { LayoutContext } from '../context/LayourContext'

function MyApp({ Component, pageProps }) {
  return <AppWrapper>
    <LayoutContext>
      <Component {...pageProps} />
    </LayoutContext>
  </AppWrapper>
}

export default MyApp
