import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Main from './Pages/Main/index.jsx'
import NotFound from './Pages/NotFound/index.jsx'
import Acaí from './Pages/Acaí/index.jsx'
import Snack from './Pages/Snack/index.jsx'
import Pedido from './Pages/Pedido/index.jsx'
import { CartProvider } from './Context/CartContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {index: true, element: <Main/>},
      {path:"/Acaí", element:<Acaí/>},
      {path:"/Snack", element:<Snack/>}
    ]
  },
  {
    path: "/pedido", element: <Pedido/>
  },
  {
    path: "*", element: <NotFound/>
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CartProvider>
    <RouterProvider router={router}/>
  </CartProvider>
  </StrictMode>,
)
