import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import {Button} from 'antd'

function Favorite(props) {


    const movieId = props.movieId    
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.movieTitle
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.movieRunTime


    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    //userFrom : userFrom 이걸 let에 넣을때 userFrom 만으로 생략이 가능함
    let variable = {
        userFrom: userFrom,
        movieId: movieId,
        movieTitle: movieTitle,
        moviePost: moviePost,
        movieRunTime: movieRunTime
    }

    useEffect(() => {        


        console.log("movieId :: " + movieId);
        console.log("props.movieInfo :: " + JSON.stringify(props));
        

        Axios.post('/api/favorite/favoriteNumber', variable)
            .then(response =>{
                setFavoriteNumber(response.data.favoriteNumber)                                       
                if(response.data.success){
                }else{
                    alert('숫자 정보를 가져오는데 실패 하였습니다!');
                }

            })

        Axios.post('/api/favorite/favorited', variable)
            .then(response =>{
                if(response.data.success){
                    setFavorited(response.data.favorited)
                }else{
                    alert('정보를 가져오는데 실패 하였습니다!');
                }

            })

        
    }, [])

    const onClickFavorite = () => {

        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite', variable)
            .then(response => {
                if(response.data.success){
                    console.log("a :: " + FavoriteNumber);

                    setFavoriteNumber(FavoriteNumber - 1)
                    setFavorited(!Favorited)
                }else{
                    alert('삭제 실패!');
                }
            })
        }else{
            Axios.post('/api/favorite/addToFavorite', variable)
            .then(response => {
                if(response.data.success){
                    console.log("b :: " + FavoriteNumber);

                    setFavoriteNumber(FavoriteNumber + 1)
                    setFavorited(!Favorited)
                }else{
                    alert('추가 실패!');
                }
            })
        }
    }

    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favortie"} {FavoriteNumber}</Button>
        </div>
    )
}

export default Favorite
