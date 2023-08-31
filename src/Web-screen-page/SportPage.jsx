import React, { Component } from 'react';
import axios from 'axios';
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar';
import Loading from '../Components/Loading';
import { Link } from 'react-router-dom';

export default class SportPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
        sportallvideoapi: [],
        loading: true,
        seriesgenrestoggle: false,
        seriessortbytoggle: false,
        seriesgenrestext: "Genres"

    }
  }
  sportallvideoapi(include = "sport") {
    const FormData = require('form-data');
    let data = new FormData();
    data.append('category', 'series');
    data.append('sort', 'date.DESC');
    data.append('cache_buster', '1690100054');
    data.append('platform', 'wedotv');
    // if (include !== "") {
        data.append("include", include);

    // }

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://api.watch4.com/v2/getAllVideos?page=1&limit=100',
        headers: {
            token: localStorage.getItem("token"),
            // ...data.getHeaders()
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log(response.data.result.videos);
            this.setState({ sportallvideoapi: response.data.result.videos });
            this.setState({ loading: false });
            this.setState({ seriesgenrestoggle: false });
            this.setState({ seriesgenrestext: include })
        })
        .catch((error) => {
            console.log(error);
            this.setState({ loading: false });
        });

}
componentDidMount() {
    this.sportallvideoapi();

}
  render() {
    return (
      <>
      <div className="overflow-hidden bg-[#343a40] w-full h-[100vh]">
          <div className="overflow-y-scroll scroll-smooth px-40">
              {/* <Navbar /> */}
              <HeaderNavbar/>
              <div className="container">
                  <div className="flex justify-between" id="genreSortSection">
                      <span className="text-3xl font-bold text-white">Sports</span>
                      {/* <div className="filter-inner flex gap-10 mr-100">
                          <button
                              onClick={() => { this.setState({ genrestoggle: true }) }}
                              className="bg-[#1c1c1c] min-w-[270px] text-white border border-none border-[#333] text-[24px] ml-[10px] text-left capitalize rounded-none py-3 px-[30px]"
                          >
                              {this.state.genrestext}
                          </button>
                          <button
                              onClick={() => { this.setState({ sortbytoggle: true }) }}
                              className="bg-[#1c1c1c] min-w-[270px] text-white border border-none border-[#333] text-[24px]  text-left capitalize rounded-none py-3 px-[30px]"
                          >
                              Sort By
                          </button>
                      </div> */}
                  </div>
                  <div className="my-10">{this.state.loading && <Loading />}</div>
                  <section className="vertical-grid grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 h-[800px] w-full relative  gap-3 my-5">
                      {
                          this.state.sportallvideoapi.map((data) => {
                            //   console.log(data)
                              return (
                                  <Link to={`/episodes/${data.id}`} key={data.id}><img src={data.files.poster_portrait_480 } className="w-[250px] h-[325px] hover:border-4 hover:border-red-700 focus:border-4 focus:border-red-700" alt="" /></Link>
                              )
                          })
                      }
                  </section>
              </div>
          </div>
      </div>
      {/* genres dom */}
      {/* {this.state.genrestoggle && <Genres selectedgenre={this.getallvideo} setgenrestext={this.setState.genrestext} />}
      {this.state.sortbytoggle && <SortBy />} */}
  </>
    )
  }
}
