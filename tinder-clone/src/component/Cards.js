import {React,useState,useEffect} from 'react'
import TinderCard from 'react-tinder-card';
import {axiosInstance} from '../axios';

function Cards() {
    
    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const request = await axiosInstance.get('/cards');
            
            setPeople(request.data); 
        }
        fetchData();
    }, []);
    // console.log(people);
    
    const swiped = (direction,nameToDelete) =>{
        console.log(JSON.stringify(nameToDelete));
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
                    onSwipe={(dir) => swiped(dir,person)}
                    onCardLeftScreen={()=> outOfFrame(person.name)}
                >
                    <div    style={{backgroundImage:`url(${person.imgUrl})`}}
                            className='card' >
                            <h3>{person.name}</h3>
                    </div>
                </TinderCard>
            );})} 
            </div>
        </div>
    )
}

export default Cards;
