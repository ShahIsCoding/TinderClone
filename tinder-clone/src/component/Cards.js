import { React, useState, useEffect } from "react";
import { axiosInstance } from "../axios";

function Cards(props) {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axiosInstance.get("/users");
      console.log("fetchData", request.data);
      setPeople(request.data);
    }
    fetchData();
  }, []);

  const swiped = (direction, person) => {
    async function swipe(direction, personId) {
      if (direction === "right") {
        const request = await axiosInstance.post(`/matchlist/likes`, {
          _id: personId,
        });
        console.log("successfully added the match ", request);
      } else {
        console.log(direction);
      }
    }
    swipe(direction, person._id);
  };

  const outOfFrame = (name) => {
    console.log(name + " left the frame");
  };

  return (
    <div className="tinderCards">
      <div className="tinderCards__cardContainer">
        {people.map((person) => {
          return (
            <div
              style={{ backgroundImage: `url(${person.imgUrl})` }}
              className="card"
            >
              <h3>{person.firstname + " " + person.lastname}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Cards;
