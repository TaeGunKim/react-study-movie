import React, { useEffect, useState } from 'react'
import './Favorite.css';
import Axios from 'axios';

function FavoritePage() {
    
    const [Favorites, setFavorites] = useState([])

    useEffect(() =>{        
        Axios.post('/api/favorite/getFavoritedMovie', {userFrom: localStorage.getItem('userId')})
            .then(response => {
                if(response.data.success){                    
                    console.log(response.data);                    
                    //setFavorites(response.data.favorites)
                }else{
                    alert("영화정보를 가져오는데 실패하였습니다.");
                }
            })
    })

    return (
        <div style ={{width: '85%', margin: '3rem auto'}}>
            <h2>Favorite Movies</h2>
            <hr/>

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                    
                

                </tbody>
            </table>
            
        </div>
    )
}

export default FavoritePage
