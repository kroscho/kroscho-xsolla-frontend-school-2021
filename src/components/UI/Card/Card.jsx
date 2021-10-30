import React, {useState, useContext} from 'react';
import { Context } from '../../../index';

import './styles.css'

import icon_svg from "./icon.svg"

const Card = () => {
    const {data} = useContext(Context)

    return (
        <div className="card">
            <img src="https://cdn3.xsolla.com/files/uploaded/113250/826adbf1a19ba19e6ba9af9308d2b309.png" alt="image" title="name"></img>
            <div className="card-date">
                <span>20</span>
            </div>
            <div className="card-name">
                <span>Rave Autumn</span>
            </div>
            <div className="card-icon">
                <img className="card-icon-fav" src={icon_svg} alt="icon" title="icon-fav"></img>
            </div>
        </div>
    )
}

export default Card;