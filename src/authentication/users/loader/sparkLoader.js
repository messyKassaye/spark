import { Button, Typography } from '@material-ui/core';
import React from 'react';
import SparkLogo from "../../../assets/logoSpark.png"
import './sparkLoader.css'
export default function SparkLoader(props){
    return(
        <div>
          <div id="outerContainer">
              <div id="container">
                  <div className="item">
                      <img src={SparkLogo}/>
                  </div>
                  <div className="circle" style={{animationDelay: '0s'}}></div>
                  <div className="circle" style={{animationDelay: '1s'}}></div>
                  <div className="circle" style={{animationDelay: '2s'}}></div>
                  <div className="circle" style={{animationDelay: '3s'}}></div>
              </div>
              {
                 props.show
                 ?
                    (
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                            <Typography color={'primary'} className="locationTitle">
                                Can not find any members near by you 
                            </Typography>
                        </div>
                    )
                 :
                    (
                        <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                                <Typography variant={'h5'} color={'primary'}>
                                    Finding peers near by you
                                </Typography>
                        </div>
                    )
              }
          </div>
       </div>
    );
}