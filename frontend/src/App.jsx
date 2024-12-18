import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat.jsx';
import SavedRecipes from './pages/SavedRecipes';
import About from './pages/About';
import Navbar from './components/Navbar';

// ルート定義
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <>
          <Navbar />
          <Home />
        </>
      ),
    },
    {
      path: '/chat',
      element: (
        <>
          <Navbar />
          <Chat />
        </>
      ),
    },
    {
      path: '/saved',
      element: (
        <>
          <Navbar />
          <SavedRecipes />
        </>
      ),
    },
    {
      path: '/about',
      element: (
        <>
          <Navbar />
          <About />
        </>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true, // React.startTransition を事前に有効化
    },
  }
);

// Appコンポーネント
function App() {
  return <RouterProvider router={router} />;
}

export default App;
