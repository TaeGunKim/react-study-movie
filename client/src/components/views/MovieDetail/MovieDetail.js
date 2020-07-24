import React, {useEffect, useState } from 'react'
import { API_URL,API_KEY,IMAGE_BASE_URL } from '../../Config';
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo';
import GridCards from '../commons/GridCards';
import Favorite from './Sections/Favorite';
import { Row } from 'antd';


function MovieDetail(props) {

    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])

    const [ActorToggle, setActorToggle] = useState(false)
    

    useEffect(() => {

        //console.log(props.match)
        //console.log("movieId :: " + movieId)

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                //console.log(response)
                setMovie(response)
            })
    
        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                setCasts(response.cast)
            })

    }, [])

    const toggleActoreView = () => {
        setActorToggle(!ActorToggle)
    }

    
    



    return (
        <div>
            
            {/*Header */}
            {Movie.backdrop_path && 
                <MainImage 
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`} 
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }

            {/*Body */}
            <div style={{ width:'85%', margin:'1rem auto'}}>                
                {/*Favorite Button*/}
                <div style={{display:'flex', justifyContent:'flex-end'}}>
                    {/*
                    LoginPage.js에 보면 로그인 할때  window.locaStorage에 set한 부분을 가져오면 됨
                    window.localStorage.setItem('userId', response.payload.userId);
                    */}
                    <Favorite movieInfo={Movie} movieId = {movieId} userFrom={localStorage.getItem('userId')}
                    />
                </div>


                {/*Movie Info */}
                <MovieInfo
                    movie = {Movie}
                />

                <br/>
                {/*Actors Grid */}

                <div style={{display:'flex', justifyContent:'center', margin:'2rem'}}>
                    <button onClick={toggleActoreView}> Toggle Actor View</button>
                </div>

                {ActorToggle &&                     
                    <Row gutter={[16,16]}>
                        {Casts && Casts.map((cast,index) => (                            
                            <React.Fragment key ={index}>
                                <GridCards 
                                    image = {cast.profile_path ? 
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null }                                
                                    charaterName = {cast.name}                                
                                />
                            </React.Fragment>
                        ))}
                    </Row>                
                }


            </div>

            
        </div>
    )
}

export default MovieDetail
