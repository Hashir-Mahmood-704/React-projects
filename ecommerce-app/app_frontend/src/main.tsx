import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { ClerkProvider } from "@clerk/clerk-react"
import { store } from "./store.ts"
import { Provider } from "react-redux"

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <Provider store={store}>
      <App />
    </Provider>
  </ClerkProvider>
)
