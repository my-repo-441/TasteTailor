import ReactDOM from 'react-dom/client';
import React from 'react';
import { DndProvider } from 'react-dnd'; // DragDropContext のプロバイダー
import { HTML5Backend } from 'react-dnd-html5-backend'; // HTML5バックエンド
import App from './App.jsx';
import './index.css';
import { RecipeProvider } from './contexts/RecipeContext.jsx'; // RecipeContextのプロバイダー

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecipeProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </RecipeProvider>
  </React.StrictMode>
);
