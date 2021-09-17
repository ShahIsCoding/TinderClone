import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router';
import ScrollToBottom from 'react-scroll-to-bottom'; 
import { axiosInstance } from '../axios';

import { Avatar } from '@material-ui/core';

function ChatScreen(props) {
    
    const [macthedUser, setMatch]  = useState({
        name:null,
        imgUrl:null
    });
    const {chatroomId} = useParams();
    const [input, setInput] = useState('');
    const [messages, setMessage] = useState([]);

   useEffect(() => {
        async function fetchChatroomUser(chatroomId){
            await axiosInstance.get(`/chats/users/${chatroomId}`)
            .then(users => {
                setMatch(users.data.macthedUser)

            })
            .catch(err => console.log(err))
        }
        async function fetchMessages(chatroomId){
            await axiosInstance.get(`/chats/${chatroomId}`)
            .then(messages => setMessage(messages.data))
            .catch(err => console.log(err));
        }
        if(macthedUser.name == null) fetchChatroomUser(chatroomId);
        fetchMessages(chatroomId);
    }, [messages]);

    const handleSend = e =>{
        e.preventDefault();
        console.log(macthedUser);
        async function postMessage(){
            await axiosInstance.post(`/chats/${chatroomId}`,{
                message:input
            });
            setInput("");
        }
    postMessage();
    }
    return (
        <div className='chatScreen'>
            <p className='chatScreen__timestamp'>You have matched with {macthedUser.name} </p>
            <ScrollToBottom className='chatScreen__message' >
                {messages.map((message)=>
                    (!message.sender)?
                       (
                        <div className="chatScreen__text chatScreen__text--match">
                            <Avatar
                            className="chatScreen__image"
                            alt={macthedUser.name}
                            src={macthedUser.imgUrl}
                            />
                            <p >{message.message}</p>
                        </div>
                       ):(
                        <div className="chatScreen__text chatScreen__text--User">
                            <p>{message.message}</p>
                        </div>
                        )
                )}
            </ScrollToBottom>
            
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
