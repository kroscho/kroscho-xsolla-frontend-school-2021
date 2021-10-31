import React from 'react';

import './styles.css'

import icon_svg from "./icon.svg"
import icon2_svg from "./icon2.svg"

const Card = ({event, onClick, favList}) => {

    const isFavourite = favList.filter((item => item.id === event.id)).length > 0 ? true : false;
    const icon = isFavourite ? icon2_svg : icon_svg

    return (
        <div className="card">
            <img src={event.image} alt="event" title="name"></img>
            <div className="card-date">
                <span>{event.date.substr(0, 2)}</span>
            </div>
            <div className="card-name">
                <span>{event.name}</span>
            </div>
            <div className="card-icon">
                <img 
                    className="card-icon-fav"
                    onClick={() => onClick(event.id)} 
                    src={icon} 
                    alt="icon" 
                    title="icon-fav"></img>
            </div>
        </div>
    )
}

export default Card;