import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import store from "../store/index.ts"
import { GoogleOAuthProvider } from '@react-oauth/google'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='945895220472-lu73hfjtbhadpp3e6i6hbuanj4dap22s.apps.googleusercontent.com'>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
