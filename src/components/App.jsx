import { useState, useEffect } from 'react'
import Datatable from './Datatable';
import PostDetail from './PostDetail';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

function App() {
  return <div className='container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Datatable />} />
          <Route path="/post/:postid" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </div>;
}

export default App;
