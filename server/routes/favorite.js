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

router.post('/favorited', (req,res) => {

    //내가 이영화를 Favorite 리스트에 넣었는지 정보를 dB에서 가져오기

    
    //mongoDb 에서 favortie숫자를 가져오기
    Favorite.find({"movieId" : req.body.movieId, "userFrom" : req.body.userFrom})
        .exec(( err, info ) => {
            if(err) return res.statusCode(400).send(err)
            
            let result = false;
            if(info.length !== 0){
                result = true
            }

            //그다음에 front에 다시 숫자 정보를 보내주기
            res.status(200).json({success: true, favorited:result})
        })
})


router.post('/addToFavorite', (req,res) => {
    

    const favorite = new Favorite(req.body)

    //save 메소드
    favorite.save((err,doc) => {
        if(err) return res.status(400).send(err)
        return res.status(200).json({success:true})
    })
})


router.post('/removeFromFavorite', (req,res) => {
    
    Favorite.findOneAndDelete({movieId: req.body.movieId, userFrom: req.body.userFrom})
        .exec ((err,doc) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true})
        })
    
})

router.post('/getFavoritedMovie', (req,res) => {
    
    Favorite.findOneAndDelete({'userFrom':req.body.userFrom})
        .exec((err, favorites) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true, favorites})
        })
        
    
})





module.exports = router;
