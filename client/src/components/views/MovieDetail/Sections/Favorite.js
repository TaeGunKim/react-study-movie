import React, { useEffect } from 'react'
import Axios from 'axios'

function Favorite(props) {


    const movieId = props.movieId    
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.movieTitle
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.movieRunTime


    useEffect(() => {        

        let variable = {
            userFrom,
            movieId
        }

        console.log("movieId :: " + movieId);

        Axios.post('/api/favorite/favoriteNumber', variable)
            .then(response =>{
                if(response.data.success){
                    console.log("get favoriteNum~~~~~~~~~~~~"); 
                    console.log(response.data);
                    console.log("get favoriteNum~~~~~~~~~~~~"); 
                }else{
                    alert('숫자 정보를 가져오는데 실패 하였습니다!');
                }

            })

        
    }, [])

    return (
        <div>
            <button>Favorite</button>
        </div>
    )
}

export default Favorite
