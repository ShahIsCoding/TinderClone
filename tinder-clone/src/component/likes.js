import React,{useState,useEffect} from 'react'
import Chat from './ChatCards';
import {axiosInstance} from '../axios';
import { IconButton} from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineSharpIcon from '@material-ui/icons/AddCircleOutlineSharp';

function Likes() {

    const [likes,setLikes] = useState([]);
    const [trigger,setTrigger] = useState(0);  

    useEffect(() => {
        async function fetchLikes(){
            console.log('FETCH Likes');
            axiosInstance.get(`/matchlist/likes`)
            .then((req) =>{
                setLikes(req.data)
            })
            .catch((err) => console.log(err));
        }
        fetchLikes();
    }, [trigger]);


    const removeMatches = (matchId) =>{
            axiosInstance.delete(`/matchlist/${matchId}`)
            .then((matches) => {
                setTrigger(() =>trigger+1);    
            })
            .catch(err => console.log(err));
        
    }
    const addMatches = (personId) =>{
        async function addmtches(personId){
            await axiosInstance.post(`/matchlist/match`,{
                _id:personId
            })            
            .then((matches) => {
                setTrigger(() =>trigger+1);    
            })
            .catch(err => console.log(err));
        }
        addmtches(personId);
    }
    return (
        <div className='likes'>
            {
                likes.map((like) =>{
                    return  <div className='like' key = {like._id}> 
                                <Chat 
                                    name={like.firstname +' '+like.lastname}
                                    message='message'
                                    timestamp="time taken"
                                    profilePic = {like.imgUrl}
                                    id={like._id}

                                />
                                <div className="btns">
                                    <IconButton>
                                        <AddCircleOutlineSharpIcon onClick={() => addMatches(like._id)}/>
                                    </IconButton>
                                    <IconButton>
                                        <HighlightOffIcon  onClick={() => removeMatches(like._id)}/>
                                    </IconButton>
                                </div>
                            </div>
                })
            }
        </div>
    )
}

export default Likes;