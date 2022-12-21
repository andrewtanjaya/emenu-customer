import React from 'react'
import './MenuHorizontalCard.css'

function MenuHorizontalCard(props) {
  return (
    <div className='menu-horizontal-card-container'>
        <img src={props.foodPicture} alt="" />
        <div className="menu-card-description">
            <p>{props.foodName}</p>
            <p>{props.totalSold} Sold</p>
        </div>
        <p className='menu-card-price'><b>{props.foodPrice}</b></p>
    </div>
  )
}

export default MenuHorizontalCard