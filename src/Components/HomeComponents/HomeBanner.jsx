import React from 'react';
import Container from 'react-bootstrap/Container';


function HomeBanner() {
    return (
        <div className='py-20 items-center'>
             <Container fluid>
            <h1 className='mb-3 text-white font-semibold text-5xl'>wedotv - big stories for free</h1>
            <button className=" bg-slate-200 font-bold font-sans text-lg  py-3 px-14 mt-10 rounded-sm hover:bg-red-700 focus:bg-red-700 focus:text-white transition hover:text-white">
            Watch Now
          </button>
            </Container>
        </div>
    )
}

export default HomeBanner;
