import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
 import {useNavigation} from '../Contexts/ContextPage';

const MovieDetailPage = ({params}) => {
    const [videodetail, setVideoDetail] = useState([0]);
    // const [loading, setLoading] = useState(false);
    const history = useNavigate();
    const params = useParams();
    const {setNavigatedBack} = useNavigation();
    const handleNavigate = () => {
        // Perform navigation logic
        setNavigatedBack(true);
      };
    
    useEffect(() => {
        console.log("use Effect")
        getVideo();
    }, []);

    const getVideo = () => {

        const FormData = require('form-data');
        let data = new FormData();

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.watch4.com/v2/getVideo?video_id=${params.id}`,
            headers: {
                token: localStorage.getItem('token'),
                // ...data.getHeaders()
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(response.data.result.videos[0]);
                setVideoDetail(response.data.result.videos[0]);
                // setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                // setLoading(false);
            });
    };

    return (
        <div className='relative top-0 left-0 right-0 bottom-0'>
            <div className='w-[100%] h-[100vh] fixed top-0 left-0 right-0 bottom-0'>
                <div className="w-[100%] h-[100vh] bg-[#00000090] absolute top-0 left-0 right-0 bottom-0"></div>
                <img src={videodetail.files?.thumb_480} className='w-full h-[100vh]' alt={videodetail?.title} />
            </div>
            <div className=" absolute top-20 left-52">
                <div className="flex  gap-x-36">
                    <div className="border-5 border-white w-[20rem] h-[51vh]">
                        <img src={videodetail.files?.poster_landscape_320} className='w-[20rem] h-[50vh]' alt={videodetail.title} />
                    </div>
                    <div className="flex flex-col gap-y-4 text-white">
                        <div><h2>{videodetail?.title}</h2></div>
                        <div className='grid grid-cols-2'><h3>{videodetail.meta?.year}</h3><h3><span>imdb </span>{videodetail.meta?.imdb_score}</h3></div>
                        <div className="flex gap-x-10"><h3 className='text-yellow-500'>Directed By</h3><h3>{videodetail.meta?.director}</h3></div>
                        <div className="flex gap-x-[6.5rem]"><h3 className='text-yellow-500'>Rating</h3><h3>{videodetail.meta?.rating_uk}</h3></div>
                        <div className="flex gap-x-[8.5rem]"><h3 className='text-yellow-500'>Cast</h3><h3>{videodetail.meta?.cast}</h3></div>
                        <div className="flex gap-x-14 my-5">
                            <Link to={`/player/${videodetail.id}`}> <button className='bg-white text-black font-bold font-sans px-6 py-3 rounded-md focus:bg-red-700 hover:bg-red-700'>Play Movie</button></Link>
                            <button onClick={() =>history(-1)} className='bg-white text-black font-bold font-sans px-6 py-3 rounded-md focus:bg-red-700 hover:bg-red-700'>Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
