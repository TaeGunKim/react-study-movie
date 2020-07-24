const express = require('express');
const router = express.Router();
const {Favorite} = require('../models/Favorite');

//=================================
//             favorite
//=================================

//express 라이브러리의 router가 endpoint만 사용할수 있도록 하는 기능함
//router.post('/api/favorite/favoriteNumber') 에서 앞의 url을 생략하려면 
//server > index.js 에 선언해줘야 함
//app.use('/api/favorite', require('./routes/favorite'));

router.post('/favoriteNumber', (req,res) => {

    //body는 index.js에 bodyparder에 있는것을 이용해서 front에서 보낸 movieId를 활용 할 수 잇음    
    //mongoDb 에서 favortie숫자를 가져오기
    Favorite.find({"movieId" : req.body.movieId})
        .exec(( err, info ) => {
            if(err) return res.statusCode(400).send(err)
            
            //그다음에 front에 다시 숫자 정보를 보내주기
            res.status(200).json({success: true, favoriteNumber:info.length })
        })
})


module.exports = router;
