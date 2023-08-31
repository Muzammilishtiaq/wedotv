import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar';
import {Swiper, SwiperSlide } from 'swiper/react';
import Loading from '../Components/Loading';
import axios from 'axios';

function EpisodesPage() {
    const [Episodes, setEpisodes] = useState([]);
    const [seasons, setSeasons] = useState([0]);
    const[loading,setLoading]=useState(true);
    const param = useParams();
    const getEpisodes=()=>{
        // const axios = require('axios');
const FormData = require('form-data');
let data = new FormData();

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: `https://api.watch4.com/v2/getEpisodes?series_id=${param.id}`,
  headers: { 
    token: localStorage.getItem("token"), 
    // ...data.getHeaders()
  },
  data : data
};

axios.request(config)
.then((response) => {
  console.log(response.data.result.season[0].episodes);
  setEpisodes(response.data.result);
  setSeasons(response.data.result.season[0].episodes);
  setLoading(false);
})
.catch((error) => {
  console.log(error);
  setLoading(false);
});
    }
    useEffect(() => {
        getEpisodes();
    }, []);
  return (
    <div className='w-full h-[100vh] bg-black px-40'>
        <HeaderNavbar/>
        <div className="my-10">{loading && <Loading />}</div>
    <div className="container   mb-5">
        <h1 className='text-white mb-2'>{Episodes.title}</h1>
        <h2 className='text-red-700 mb-20'><span>Episodes:</span> {Episodes.episodes}</h2>
        <Swiper spaceBetween={10} slidesPerView={3} className=" mb-10">
          {seasons.map(data=>{
            // console.log(data)
            return(
                <SwiperSlide >
                    <Link to={`/player/${data.id}`} key={data.id}><img src={data.files?.thumb} className='w-full h-[40vh] hover:border-4 hover:border-red-700 focus:border-4 focus:border-red-700' alt="" /></Link>
                    <h4 className='text-white mt-2 font-sans'>{data.title}</h4>
                </SwiperSlide>
              )
          })}  
        </Swiper>
    </div>

    </div>
  )
}

export default EpisodesPage;
