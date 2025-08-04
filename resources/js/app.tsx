import React from 'react';
import { createRoot } from 'react-dom/client';
import  Detail from './components/Details'
import App from './components/App';
import { BrowserRouter, Routes, Route } from "react-router";

import '../css/app.css';

const container = document.getElementById('app');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/book/:id" element={<Detail/>}/>
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );
}