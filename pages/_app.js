import '../styles/globals.css'
import { AppWrapper } from './component/context/AppContext'
import { LayoutContext } from './component/context/LayourContext'

function MyApp({ Component, pageProps }) {
  return <AppWrapper>
    <LayoutContext>
      <Component {...pageProps} />
    </LayoutContext>
  </AppWrapper>
}

export default MyApp
