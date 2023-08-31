import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar';
import Loading from '../Components/Loading';
import { Link, useNavigate } from 'react-router-dom';
import Genres from '../Components/Togglepage/Genres';
import SortBy from '../Components/Togglepage/SortBy';

function Moviespage() {
  const history = useNavigate();
  const [allvideo, setAllVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genrestoggle, setGenresToggle] = useState(false);
  const [sortbytoggle, setSortByToggle] = useState(false);
  const [genrestext, setGenresText] = useState('Genres');
  const [focusedIndex, setFocusedIndex] = useState(0);

  const getallvideo = (include = '') => {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('category', 'movie');
    data.append('sort', 'date.DESC');
    data.append('cache_buster', '1690100054');
    data.append('platform', 'wedotv');
    if (include !== '') {
      data.append('include', include);
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.watch4.com/v2/getAllVideos?page=1&limit=100',
      headers: {
        token: localStorage.getItem('token'),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        setAllVideo(response.data.result.videos);
        setLoading(false);
        setGenresToggle(false);
        if (include === '') setGenresText('Genres');
        else setGenresText(include);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const dataEvent = () => {
    let newallvideoss = [...allvideo].reverse();
    setAllVideo(newallvideoss.sort((a, b) => a.date_created > b.date_created));
    setSortByToggle(false);
  };

  const ascendingEvent = () => {
    const sortby = [...allvideo];
    if (sortby.length > 0) {
      const resultsort = sortby.sort((a, b) => a.title.localeCompare(b.title));
      setAllVideo(resultsort);
      setSortByToggle(false);
    }
  };

  useEffect(() => {
    getallvideo();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [allvideo]);

  const handleKeyDown = (e) => {
    const gridItemsCount = allvideo.length;
    console.log("all video",gridItemsCount)

    if (e.key === 'ArrowLeft') {
      setFocusedIndex((focusedIndex + gridItemsCount - 1) % gridItemsCount);
    } else if (e.key === 'ArrowRight') {
      setFocusedIndex((focusedIndex + 1) % gridItemsCount);
    } else if (e.key === 'Enter') {
      // console.log(e);
      const selectedMovie = allvideo[focusedIndex];
        console.log("selectMovie",selectedMovie);
        if (selectedMovie && selectedMovie.id) {
          history(`/Moviedetail/${selectedMovie.id}`);
        }       
    }

  };

  return (
    <>
      <div className="overflow-hidden bg-[#343a40] w-full h-[100vh]">
        <div className="overflow-y-scroll scroll-smooth px-40">
          <HeaderNavbar />
          <div className="container">
            <div className="flex justify-between" id="genreSortSection">
              <span className="text-3xl font-bold text-white">Movies</span>
              <div className="filter-inner flex gap-10 mr-100">
                <button
                  onClick={() => {
                    setGenresToggle(true);
                  }}
                  className="bg-[#1c1c1c] min-w-[270px] text-white border border-none border-[#333] text-[24px] ml-[10px] text-left capitalize rounded-none py-3 px-[30px]"
                >
                  {genrestext}
                </button>
                <button
                  onClick={() => {
                    setSortByToggle(true);
                  }}
                  className="bg-[#1c1c1c] min-w-[270px] text-white border border-none border-[#333] text-[24px]  text-left capitalize rounded-none py-3 px-[30px]"
                >
                  Sort By
                </button>
              </div>
            </div>
            <div className="my-10">{loading && <Loading />}</div>
            <section className="vertical-grid grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 h-[800px] w-full relative  gap-3 my-5">
              {allvideo.map((data, index) => (
                <Link
                  to={`/Moviedetail/${data.id}`}
                  key={data.id}
                  className={index === focusedIndex ? 'border-[10px] border-red-800' : ''}
                >
                  <img src={data.files.thumb_480} className="w-[250px] h-[325px] " alt="" />
                </Link>
              ))}
            </section>
          </div>
        </div>
      </div>
      {genrestoggle && <Genres selectedgenre={getallvideo} />}
      {sortbytoggle && <SortBy selecteddate={dataEvent} selectedsort={ascendingEvent} />}
    </>
  );
}

export default Moviespage;
