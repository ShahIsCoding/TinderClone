import React,{useState,useEffect} from 'react'
import Chat from './ChatCards';
import {axiosInstance} from '../axios';
import { IconButton} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function Chats() {

    const [matches,setMatches] = useState([]);
    const [trigger,setTrigger] = useState(0);  

    useEffect(() => {
        async function fetchMatches(){
            console.log('FETCH MATCHES');
            axiosInstance.get(`/matchlist/match`)
            .then((req) =>{
                setMatches(req.data);
            })
            .catch((err) => console.log(err));
        }
        fetchMatches();
    }, [trigger]);


    const removeMatches = (matchId) =>{
            axiosInstance.delete(`/matchlist/match/${matchId}`)
            .then((matches) => {
                setTrigger(() =>trigger+1);    
            })
            .catch(err => console.log(err));
        
    }
    return (
        <div className='chats'>
            {
                matches.map((match) =>{
                    return  <div className='chat'                                     key = {match._id}> 
                                <Chat 
                                    name={match.firstname +' '+match.lastname}
                                    message='message'
                                    timestamp="time taken"
                                    profilePic = {match.imgUrl}
                                    id={match._id}

                                />
                                <IconButton>
                                    <HighlightOffIcon  onClick={() => removeMatches(match._id)}/>
                                </IconButton>
                            </div>
                })
            }
        </div>
    )
}

export default Chats;