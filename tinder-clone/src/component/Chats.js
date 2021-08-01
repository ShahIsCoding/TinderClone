import React from 'react'
import Chat from './Chat';

function Chats() {
    return (
        <div className='chats'>
        <Chat 
            name='NAOMI'
            message='hey ya'
            timestamp="40 second ago"
            profilePic ="https://m.media-amazon.com/images/M/MV5BMzQ5YWRlYjktZDM5My00N2YwLTg4N2ItYmY2ZDQ4ZGYwMzBkXkEyXkFqcGdeQXVyNDU1NjUxOTc@._V1_.jpg"
        />
        <Chat 
            name='Sai'
            message='hey ya'
            timestamp="10 second ago"
            profilePic ="https://i.zoomtventertainment.com/story/sai-pallavi_1.jpg?tr=w-1200,h-900"
        />
        </div>
    )
}

export default Chats;
