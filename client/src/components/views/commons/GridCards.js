import React from 'react'
import { Col } from 'antd';


function GridCards(props) {


    if(props.landingPage){
        return (            
            <Col lg={6} md={8} xs={24}>
                <div style= {{ position: 'relative'}}>
                    <a href={`movie/${props.movieId}`}>                        
                        <img style={{width:'100%' , height:'320px'}} src={props.image} alt={props.movieName} />                        
                    </a>
                </div>
            </Col>          
        )
    }else{
        return (         
            
            <Col lg={6} md={8} xs={24}>
                <div style= {{ position: 'relative'}}>                    
                    {props.image && 
                        <img style={{width:'100%' , height:'320px'}} src={props.image} alt={props.charaterName} />                    
                       
                    }
                    {!props.image && 
                        <div style={{width:'100%' , height:'320px', border:'1px solid black', textAlign:'center', paddingTop: '150px'}}>
                            no image
                        </div>
                    }                    
                    {props.charaterName}
                    
                    
                </div>
            </Col>          
            
        )
    }
}

export default GridCards
