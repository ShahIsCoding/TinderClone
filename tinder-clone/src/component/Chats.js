import React,{useState,useEffect} from 'react'
import Chat from './Chat';
import {axiosInstance} from '../axios';
import { IconButton, Link } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
function Chats(props) {

    const [matches,setMatches] = useState([]);
    const [Id,setId]= useState('');

    useEffect(() => {
        setId(props.id);
        console.log('Id : ',props.id);
        
        async function fetchMatches(Id){
            axiosInstance.get(`/matchlist/${Id}`)
            .then((req) =>{
                setMatches(req.data[0].matches)
                console.log(req.data[0].matches);
            })
            .catch((err) => console.log(err));
        }
        fetchMatches(props.id);
    }, []);

    return (
        <div className='chats'>
            {
                matches.map((match) =>{
                    return <div >
                                <Chat 
                                name={match.firstname +' '+match.lastname}
                                message='message'
                                timestamp="time taken"
                                profilePic = {match.imgUrl}
                                id={match._id}
                                />
                            </div>
                })
            }
        </div>
    )
}

export default Chats;
