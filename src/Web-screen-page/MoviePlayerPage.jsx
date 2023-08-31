import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';


function MoviePlayerPage() {
    const [playerapi, setPlayerApi] = useState([]);
    const param = useParams()
    const getVideo = () => {

        const FormData = require('form-data');
        let data = new FormData();

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.watch4.com/v2/getVideo?video_id=${param.id}`,
            headers: {
                token: localStorage.getItem('token'),
                // ...data.getHeaders()
            },
            data: data,
        };

        axios
            .request(config)
            .then((response) => {
                console.log(response.data.result.videos[0].files.mp4);
                setPlayerApi(response.data.result.videos[0].files.mp4);
                // setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                // setLoading(false);
            });
    };

    useEffect(() => {
        getVideo();
    }, [])
    return (
        <>
        <div className='w-full h-[100vh]'>
<ReactPlayer 
width={"100%"}
height={"100vh"}
controls
playing={true}
url={playerapi} />
        </div>
        </>
    )
}

export default MoviePlayerPage;
