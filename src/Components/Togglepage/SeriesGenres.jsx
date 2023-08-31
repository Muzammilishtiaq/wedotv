import React, { Component } from 'react';
import axios from 'axios';

export default class SeriesGenres extends Component {
    constructor(props){
        super(props)
        this.state={
            seriesgenresapi:[],
        }
    }
    getseriesgenres(){
        const FormData = require('form-data');
        let data = new FormData();
        data.append('cache_buster', '1689441295');

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.watch4.com/v2/getGenres',
            headers: {
                token: localStorage.getItem("token"),
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data.result.app_extension.genres_in_series);
                this.setState({ seriesgenresapi:response.data.result.app_extension.genres_in_series});

            })
            .catch((error) => {
                console.log(error);
            });
    }
    componentDidMount(){
       this.getseriesgenres();
    }
// on click series genres
    seriesgenresing(genredata){
        console.log(genredata);
        this.props.selectedgenre(genredata);
    }
  render() {
    return (
<div className="fixed top-0 left-0 w-full h-full overflow-hidden  bg-[rgba(0,0,0,0.85)]"  >
                <div className="absolute right-0 px-[3rem] py-5 bg-black w-[350px] h-full  overflow-y-scroll">
                    <h4 className="text-[28px] mb-[2rem] px-0 py[30px] font-bold text-white">Genre</h4>
                    <div className=" sidebar" id="listGenres">
                        {
                            this.state.seriesgenresapi.map(genredata => {
                                if(genredata !== "football"){
                                    // if(genredata != "christmas"){
                                        return(
                                            <h1 onClick={()=>{this.seriesgenresing(genredata)}} className="cursor-pointer text-2xl text-white capitalize focus:bg-red-700 hover:bg-red-700 text-left px-3 py-2" key={genredata}>{genredata}</h1>
                                        )
                                    // }
                                }
                            })
                        }
                    </div>
                </div>
            </div>
    )
  }
}
