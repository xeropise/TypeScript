import React from 'react'
import {IUser} from './IUser'

const random = (max: number) => Math.floor(Math.random() * max)

export const Card: React.FC<{user:IUser, click: () => void}> = ({user, click}) => {
    const {name, email, sentence, profession, birthDay} = user
    const b = new Date(birthDay)
    const src = `https://source.unsplash.com/random/10000x${random(300) + 500}`

    return (
        <div className='card'>
            <img src={src} className='card-img=top' alt="profile"/>
            <div className='card-body'>
                <h5 className='card-title'>{name} ({email})</h5>
                <h6 className='card-subtitle mb-2 text-muted'>{profession} birthday: {b.getFullYear()}</h6>
                <p className='card-text'>{sentence}</p>
                <a href="#!" className='btn btn-primary' onClick={click}>more data...</a>
            </div>
        </div>
    )
}