import React,{useState} from 'react'
import { Avatar } from '@material-ui/core';
function ChatScreen() {
    
    const [input, setInput] = useState('');
    const [messages, setMessage] = useState([
        {
            name:'Sai',
            image:'https://i.zoomtventertainment.com/story/sai-pallavi_1.jpg?tr=w-1200,h-900',
            message:'Whats up'
        },
        {
            name:'Sai',
            image:'https://i.zoomtventertainment.com/story/sai-pallavi_1.jpg?tr=w-1200,h-900',
            message:'How is it going'
        },
        {
            name:'Sai',
            image:'https://i.zoomtventertainment.com/story/sai-pallavi_1.jpg?tr=w-1200,h-900',
            message:'Lol'
        }
    ]);

    const handleSend = e =>{
        e.preventDefault();
        setMessage([...messages,{message:input}]);
        console.log(messages);
        setInput("");
    }
    return (
        <div className='chatScreen'>
            <p className='chatScreen__timestamp'>You have matched with Sai on 01/08/2021</p>
            {messages.map((message)=>
                (message.name)?(
                    <div className='chatScreen__message'>
                        <Avatar
                        className=''
                        alt = {message.name}
                        src = {message.image}
                            />
                        <p className='chatScreen__text'>{message.message}</p>
                    </div>
                ):(
                <div className='chatScreen__message'>
                    <p className='chatScreen__textUser'>{message.message}</p>
                </div>
                )
            )}
            <form className='chatScreen__input'>
                <input className='chatScreen__inputField'
                placeholder='Type a message'
                type='text'
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                />
                <button onClick={handleSend} className='chatScreen__inputButton'>SEND</button>
            </form>
        </div>
    )
}

export default ChatScreen;
