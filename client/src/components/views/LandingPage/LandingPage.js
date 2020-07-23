import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL,API_KEY,IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
//import { response } from 'express';

function LandingPage() {


    const [Movies, setMovies] = useState([])        
    const [MainMovieImage, setMainMovieImage] = useState(null)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        fetch(endpoint)
        .then(response => response.json())
        .then(response => {

            //console.log(response);
            setMovies([...response.results])            

            //console.log(response.results[0]);            
            setMainMovieImage(response.results[0])

        })
        

        //(1) error backdroup_path null
        //useEffect로 이미지를 가져와야 하는데 못가져와서
        //cjdma에 backdrop_path null에러가 날것입
        //랜더링 되는 화면에 먼저 선언을 했기 떄문
        //랜더링 페이지에 {MainMovieImage && [소스]} 넣으면서 if not null 태그를 넣은것임

        //(2) expected a string
        //import한 컴포던트들중 대소문자가 다르거나, 잘못 타이핑한것임..
        //나의경우 MainImage를 가져와야 하는데 랜딩페이지에서 mainMovieImage에서 쓰다보니까
        //MainIMage -> MainMovieIMage라고 잘못사용했었음; 헤헤;
        //Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
        

    }, [])

    return (
        <div style = {{ width:'100%',margin:'0' }}>
            {/* Main Image */}

            {MainMovieImage && 
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`} 
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />
            }
            <div style = {{ width: '85%', margin: '1rem auto' }}>
                <h2>Movies by latest</h2>
                <hr/>
                {/* Movie Grid Cards */}
                
            </div>
            <div style = {{ display: 'flex', justifyContent: 'center' }}>
                <button> Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
