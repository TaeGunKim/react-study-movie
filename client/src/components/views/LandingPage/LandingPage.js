import React, { useEffect, useState, useRef } from 'react'
import { FaCode } from "react-icons/fa";
import { API_URL,API_KEY,IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Typography, Row, Button } from 'antd';

const { Title } = Typography;

//import { response } from 'express';

function LandingPage() {

    //scroll paging에 필요한 상수, useRef는 react에서 import 해준다.
    const buttonRef = useRef(null);

    const [Movies, setMovies] = useState([])        
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fecthMovies(endpoint)

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

    //scroll event    
    useEffect(() => {

        window.addEventListener("scroll", handleScroll);
        
    }, [])
    
        

    const fecthMovies = (endpoint) => {
        fetch(endpoint)
            .then(response => response.json())
            .then(response => {

                //console.log(response);
                //...Movies를 넣는이유는 기존꺼를삭제 하지 않게 하기 위함
                setMovies([...Movies,...response.results])            

                //console.log(response.results[0]);            
                setMainMovieImage(response.results[0])
                setCurrentPage(response.page)

            })
    }

    const loadMoreItems = () => {        
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fecthMovies(endpoint)            
    }

    
    const handleScroll = () => {

        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;    
        const body = document.body;    
        const html = document.documentElement;    
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);    
        const windowBottom = windowHeight + window.pageYOffset;    

        if (windowBottom >= docHeight - 1) {       
            // loadMoreItems()    
            console.log('clicked')    
            buttonRef.current.click();     
        }    
    }


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

                <Row gutter={[16,16]}>
                    {Movies && Movies.map((movie,index) => (
                        <React.Fragment key ={index}>
                            <GridCards 
                                LandingPage
                                image = {movie.poster_path ? 
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null }
                                movieId = {movie.id}
                                movieName = {movie.original_title}                                
                            />
                        </React.Fragment>
                    ))}
                </Row>
                
            </div>
            <div style = {{ display: 'flex', justifyContent: 'center' }}>
                <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}> Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
