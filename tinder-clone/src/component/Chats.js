import React,{useState,useEffect} from 'react'
import Chat from './ChatCards';
import {axiosInstance} from '../axios';
import { IconButton} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
function Chats(props) {

    const [matches,setMatches] = useState([]);
    const [Id, setId] = useState('');
    const [trigger,setTrigger] = useState(0);  

    useEffect(() => {
        console.log('Id : ',props.id);
        setId(props.id);
        async function fetchMatches(){
            console.log('FETCH MATCHES');
            axiosInstance.get(`/matchlist/match`)
            .then((req) =>{
                console.log(req.data);
                setMatches(req.data);
            })
            .catch((err) => console.log(err));
        }
        fetchMatches();
    }, [trigger]);


    const removeMatches = (userId,matchId) =>{
           console.log(userId,'  ',matchId);
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
                                    <HighlightOffIcon  onClick={() => removeMatches(Id,match._id)}/>
                                </IconButton>
                            </div>
                })
            }
        </div>
    )
}

export default Chats;