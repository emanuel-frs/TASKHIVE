import { ContrastProvider } from './context/ContrastContext'
import { FontSizeProvider } from './context/FontSizeContext'
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'
import Projects from './pages/Projects/Projects'

function App() {

  return (
    <>
      <FontSizeProvider>
        <ContrastProvider>
          <Projects/>
        </ContrastProvider>
      </FontSizeProvider>
    </>
  )
}

export default App
