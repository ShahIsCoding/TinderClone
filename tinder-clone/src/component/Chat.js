import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
function Chat({name,profilePic,id}) {
    return (
        <Link to={`/chat/${id}`}>
            <div className='chat'>
                <Avatar className='chat__image' alt={name} src={profilePic} />
                <div className='chat__details'>
                    <h2>{name}</h2>
                </div>
            </div>     
        </Link>

    )
}

export default Chat
