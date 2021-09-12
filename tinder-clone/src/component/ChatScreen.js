import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router';

import { axiosInstance } from '../axios';

import { Avatar } from '@material-ui/core';

function ChatScreen(props) {
    
    const [id, setid]  = useState('');
    const {chatroomId} = useParams();
    const [input, setInput] = useState('');
    const [messages, setMessage] = useState([]);

   useEffect(() => {
    if(id === '')
    {    axiosInstance.get('/users/user')
        .then(usr => setid(usr.data._id));
    }
        async function fetchMessages(chatroomId){
            await axiosInstance.get(`/chats/${chatroomId}`)
            .then(messages => setMessage(messages.data))
            .catch(err => console.log(err));
        }
        fetchMessages(chatroomId);
    }, [messages]);

    const handleSend = e =>{
        e.preventDefault();
        async function postMessage(){
            var req =  await axiosInstance.post(`/chats/${chatroomId}`,{
                message:input
            });
            setInput("");
        }
    postMessage();
    }
    return (
        <div className='chatScreen'>
            <p className='chatScreen__timestamp'>{id} have matched with Sai on  {chatroomId}  01/08/2021</p>
            <div className='chatScreen__message' >
                {messages.map((message)=>
                    (!message.sender)?
                       ( <p className='chatScreen__text'>{message.message}</p>)
                    :
                        (<p className='chatScreen__textUser'>{message.message}</p>)
                )}
            </div>
            
            <form className='chatScreen__input' onSubmit={(e) => handleSend(e)}>
                <input className='chatScreen__inputField'
                placeholder='Type a message'
                type='text'
                value={input}
                onChange={(e)=> setInput(e.target.value)}
                />
                <button type='submit' className='chatScreen__inputButton'>SEND</button>
            </form>
        </div>
    )
}

export default ChatScreen;
