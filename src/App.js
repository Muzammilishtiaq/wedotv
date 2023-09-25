import React from 'react';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import HomePage from './Web-screen-page/HomePage';
import Moviespage from './Web-screen-page/Moviespage';
import MovieDetailPage from './Web-screen-page/MovieDetailPage';
import SeriesPage from './Web-screen-page/SeriesPage';
import SportPage from './Web-screen-page/SportPage';
import PrivacyPage from './Web-screen-page/PrivacyPage';
import TermsPages from './Web-screen-page/TermsPages';
import EpisodesPage from './Web-screen-page/EpisodesPage';
import MoviePlayerPage from './Web-screen-page/MoviePlayerPage';
import BackSpaceKey from './Components/Keyboard press/BackSpaceKey';

function App() {
  return (
<div className=''>
  <BackSpaceKey/>
<Routes>
  <Route path='/' element={<HomePage/>} />
  <Route path='/Movies' element={<Moviespage/>} />
  <Route path='/Series' element={<SeriesPage/>} />
  <Route path='/Sport' element={<SportPage/>} />
  <Route path='/Privacy' element={<PrivacyPage/>} />
  <Route path='/Terms' element={<TermsPages/>} />
  <Route path='/Moviedetail/:id' element={<MovieDetailPage/>}/>
  <Route path='/episodes/:id' element={<EpisodesPage/>} />
  <Route path='/player/:id' element={<MoviePlayerPage/>} />
</Routes>
</div>
  )
}

export default App;
