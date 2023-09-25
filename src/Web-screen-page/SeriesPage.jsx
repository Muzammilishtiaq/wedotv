import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar';
import Loading from '../Components/Loading';
import { Link } from 'react-router-dom';
import SeriesGenres from '../Components/Togglepage/SeriesGenres';
import SortBy from '../Components/Togglepage/SortBy';

const Seriespage = () => {
  const [allvideo, setAllVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genrestoggle, setGenreToggle] = useState(false);
  const [sortbytoggle, setSortByToggle] = useState(false);
  const [genrestext, setGenresText] = useState("Genres");

  const getallvideo = (include = "") => {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('category', 'series');
    data.append('sort', 'date.DESC');
    data.append('cache_buster', '1690100054');
    data.append('platform', 'wedotv');
    if (include !== "") {
      data.append("include", include);
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.watch4.com/v2/getAllVideos?page=1&limit=100',
      headers: {
        token: localStorage.getItem("token"),
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(response.data.result.videos);
        setAllVideo(response.data.result.videos);
        setLoading(false);
        setGenreToggle(false);
        if (include === "")
          setGenresText("Genres");
        else
          setGenresText(include);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  const dataEvent = () => {
    let newallvideoss = [...allvideo].reverse();
    setAllVideo(newallvideoss.sort((a, b) => a.date_created > b.date_created));
    setSortByToggle(false);
  }

  const ascendingEvent = () => {
    if (allvideo.length > 0) {
      const resultsort = [...allvideo].sort((a, b) => a.title.localeCompare(b.title));
      setAllVideo(resultsort);
      setSortByToggle(false);
    }
  }

  useEffect(() => {
    getallvideo();
  }, []);

  return (
    <>
      <div className="overflow-hidden bg-[#343a40] w-full h-[100vh]">
        <div className="overflow-y-scroll scroll-smooth px-20 lg:px-40">
          <HeaderNavbar />
          <div className="container">
            <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 justify-between" id="genreSortSection">
              <span className="text-3xl font-bold text-white">Series</span>
              <div className="filter-inner flex flex-col lg:flex-row  gap-5 lg:gap-10 mr-100">
                <button
                  onClick={() => { setGenreToggle(true) }}
                  className="bg-[#1c1c1c] min-w-[270px] text-white border border-none border-[#333] text-[24px] ml-0 lg:ml-[10px] text-left capitalize rounded-none py-3 px-[30px]"
                >
                  {genrestext}
                </button>
                <button
                  onClick={() => { setSortByToggle(true) }}
                  className="bg-[#1c1c1c] min-w-[270px] text-white border border-none border-[#333] text-[24px]  text-left capitalize rounded-none py-3 px-[30px]"
                >
                  Sort By
                </button>
              </div>
            </div>
            <div className="my-10">{loading && <Loading />}</div>
            <section className="vertical-grid grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 h-[800px] w-full relative  gap-3 my-5">
              {
                allvideo.map((data) => (
                  <Link to={`/episodes/${data.id}`} key={data.id}>
                    <img src={data.files.poster_portrait_720}
                      className="w-[250px] h-[325px] hover:border-4 hover:border-red-700 focus:border-4 focus:border-red-700"
                      alt="" />
                  </Link>
                ))
              }
            </section>
          </div>
        </div>
      </div>
      {genrestoggle && <SeriesGenres selectedgenre={getallvideo} />}
      {sortbytoggle && <SortBy selecteddate={dataEvent} selectedsort={ascendingEvent} />}
    </>
  )
}

export default Seriespage;