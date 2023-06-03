import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import './App.css';
import React from 'react';
import Alert from './components/Alert';

const LazyHomePage = lazy(() => import("./pages/HomePage"));
const LazyCoinsPage = lazy(() => import("./pages/CoinsPage"));

function App() {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          <Route path="/" element={<Suspense fallback={<div>Loading</div>}><LazyHomePage /></Suspense>}></Route>
          <Route path="/coins/:id" element={<Suspense fallback={<div>Loading</div>}><LazyCoinsPage /></Suspense>}></Route>
        </Routes>
      </div>
    <Alert/>
    </BrowserRouter>
  );
}

export default App;
