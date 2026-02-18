import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { AuthProvider } from './features/auth/AuthContext'
import { UIProvider } from './context/UIContext'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <HashRouter>
            <UIProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </UIProvider>
        </HashRouter>
    </React.StrictMode>,
)

