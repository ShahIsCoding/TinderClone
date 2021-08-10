import {React,useState,useEffect} from 'react'
import TinderCard from 'react-tinder-card';
import {axiosInstance} from '../axios';

function Cards(props) {
    
    const [people, setPeople] = useState([]);
    const [Id,setId]=useState('');
    
    useEffect(() => {

        async function fetchUser(){
            const request =  await axiosInstance.get(`/users/${props.email}`);
            console.log('user id',request.data._id);
            setId(request.data._id);
        }
        async function fetchData(){
            const request = await axiosInstance.get('/users');     
            console.log('fetchData',request.data);
            setPeople(request.data); 
        }
        fetchUser();
        fetchData();
    },[]);
    
    const swiped = (direction,person,Id) =>{
        async function  swipe(direction,personId,Id){
            if((direction === 'right') && (Id != null)){
                const request = await axiosInstance.post(`/matchlist/${Id}`,{
                     _id:personId
                 });

            console.log('successfully added the match ',request);
          }
          else{
              console.log(direction,' , ',Id);
          }
        }
        swipe(direction,person._id,Id);
   }

    const outOfFrame = (name) =>{
        console.log(name + " left the frame");
    }

    return (
        <div className='tinderCards'>
            <div className='tinderCards__cardContainer'>      
            {people.map((person) =>{
                return(
                <TinderCard
                    className='swipe'
                    key={person.name}
                    preventSwipe={["up","down"]}
                    onSwipe={(dir) => swiped(dir,person,Id)}
                    onCardLeftScreen={()=> outOfFrame(person.firstname +' '+ person.lastname)}
                >
                    <div    style={{backgroundImage:`url(${person.imgUrl})`}}
                            className='card' >
                            <h3>{person.firstname +' '+ person.lastname}</h3>
                    </div>
                </TinderCard>
            );})} 
            </div>
        </div>
    )
}

export default Cards;
