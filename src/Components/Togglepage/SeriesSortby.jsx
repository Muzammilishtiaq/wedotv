import React, { Component } from 'react'

export default class SortBy extends Component {
    constructor(props) {
        super(props)
        this.state = {
            
        }
    }
  render() {
    return (
        <div className="fixed top-0 left-0 w-full h-full overflow-hidden  bg-[rgba(0,0,0,0.85)]"  >
            <div className="absolute right-0 px-[3rem] py-5 bg-black w-[350px] h-full  overflow-y-scroll">
                <h4 className="text-[28px] mb-[2rem] px-0 py[30px] font-bold text-white">Sort By</h4>
                <div className=" sidebar" id="listGenres">
                    {/* {
                        this.state.genresapidata.map(genredata => (
                            <h1 onClick={() => this.genresing(genredata)} className="cursor-pointer text-2xl text-white capitalize focus:bg-red-700 hover:bg-red-700 text-left px-3 py-2" key={genredata}>{genredata}</h1>
                        ))
                    } */}
                    <h1 onClick={()=>this.props.selecteddate()}  className="cursor-pointer text-2xl text-white capitalize focus:bg-red-700 hover:bg-red-700 text-left px-3 py-2">Date</h1>
                    <h1 onClick={()=>this.props.selectedsort()} className="cursor-pointer text-2xl text-white capitalize focus:bg-red-700 hover:bg-red-700 text-left px-3 py-2">Alphabetical</h1>
                </div>
            </div>
        </div>
    )
  }
}
