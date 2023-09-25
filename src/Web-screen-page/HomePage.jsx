import React, { Component } from 'react';
import axios from 'axios';
import HeaderNavbar from '../HeaderNavbar/HeaderNavbar';
import HomeBanner from '../Components/HomeComponents/HomeBanner';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Loading from '../Components/Loading';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    console.log("consuctor")
    this.state = {
      moviedata: [],
      loading: true
    }
  }
  postToken = () => {
    const FormData = require("form-data");
    let data = new FormData();
    data.append("api_key", "326eb5f991905347533d91d7f3e42421");
    data.append("property", "w4free");
    data.append("cache_buster", "1684136286");

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://api.watch4.com/v2/getToken",
      headers: {
        token: "{{token}}",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        localStorage.setItem("token", response.data.result.token);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getTemplate = () => {
    var e = "en";
    const FormData = require("form-data");
    let data = new FormData();

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        "https://api.watch4.com/v2/getTemplate?template_id=12&language=" +
        localStorage.getItem("language"),
      headers: {
        token: localStorage.getItem("token"),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {

        // console.log(response.data.template.sections);
        this.setState({ moviedata: response.data.template.sections });
        this.setState({ loading: false });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  componentDidMount() {
    console.log("components did mount")
    this.postToken();
    this.getTemplate();

  }

  render() {
    return (
      <div className='w-full overflow-hidden overflow-y-scroll' style={{
        backgroundImage:
          "url('https://cdn-images.watch4.com/1080/3/1670797.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}>
        <div className='px-20 lg:px-40'>
          <HeaderNavbar />
          <HomeBanner />
          {this.state.loading && <Loading />}
          <div className="mt-10">
            {
              this.state.moviedata.map((data) => {
                if (data.label !== "Slider") {
                  // console.log(dasta.label)
                  return (
                    <div className="" key={data.label}>
                      <h1 className='text-white py-2 lg:py-0 text-md font-semibold font-sans'>{data.label}</h1>

                      <div>
                        <Swiper 
                         breakpoints={{
                          300: {
                            width: 300,
                            slidesPerView: 1,
                          },
                          400: {
                            width: 400,
                            slidesPerView: 1,
                          },
                          480: {
                            width: 480,
                            slidesPerView: 1,
                          },
                          576: {
                            width: 576,
                            slidesPerView: 1,
                          },
                          600: {
                            width: 600,
                            slidesPerView: 2,
                          },
                          640: {
                            width: 640,
                            slidesPerView: 3,
                          },
                          700: {
                            width: 700,
                            slidesPerView: 4,
                          },
                          768: {
                            width: 768,
                            slidesPerView: 5,
                          },800: {
                            width: 800,
                            slidesPerView: 5,
                          },850: {
                            width: 850,
                            slidesPerView: 6,
                          },900: {
                            width: 900,
                            slidesPerView: 6,
                          },950: {
                            width: 950,
                            slidesPerView: 7,
                          },1000: {
                            width: 1000,
                            slidesPerView: 7,
                          },1200: {
                            width: 1200,
                            slidesPerView: 7,
                          },
                        }}
                        spaceBetween={10} slidesPerView={6} className=" mb-10">
                          {data.playlist.videos.map((element) => {
                            // console.log(index, selement);
                            return (
                              <SwiperSlide key={element.id} >
                                <Link to={`/Moviedetail/${element.id}`}>
                                  <img className=' active:border-4 active:border-red-800 ' src={element.files.poster_portrait_320} alt={element.title} />
                                </Link>
                              </SwiperSlide>
                            );
                          })}
                        </Swiper>
                      </div>
                    </div>
                  )
                }
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
