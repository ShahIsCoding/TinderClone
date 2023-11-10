import React, { useState, useEffect } from "react";
import Chat from "./ChatCards";
import { axiosInstance } from "../services/axios";
import { IconButton } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineSharpIcon from "@material-ui/icons/AddCircleOutlineSharp";

function Likes() {
  const [likeR, setLikeRecieve] = useState([]);
  const [likeS, setLikeSent] = useState([]);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    async function fetchLikes() {
      console.log("FETCH Likes");
      axiosInstance
        .get(`/matchlist/likes`)
        .then((req) => {
          console.log(req);
          setLikeRecieve(req.data.receive);
          setLikeSent(req.data.sent);
        })
        .catch((err) => console.log(err));
    }
    fetchLikes();
  }, [trigger]);

  const removeLikeSent = (matchId) => {
    axiosInstance
      .delete(`/matchlist/likeSent/${matchId}`)
      .then((matches) => {
        setTrigger(() => trigger + 1);
      })
      .catch((err) => console.log(err));
  };
  const removeLikeRecieve = (matchId) => {
    axiosInstance
      .delete(`/matchlist/likeRecieve/${matchId}`)
      .then((matches) => {
        setTrigger(() => trigger + 1);
      })
      .catch((err) => console.log(err));
  };
  const addMatches = (personId) => {
    async function addmtches(personId) {
      await axiosInstance
        .post(`/matchlist/match`, {
          _id: personId,
        })
        .then((matches) => {
          setTrigger(() => trigger + 1);
        })
        .catch((err) => console.log(err));
    }
    addmtches(personId);
  };
  return (
    <div className="likes">
      <div className="likes">
        <h2>Liked</h2>
        <hr />
        {likeS.map((like) => {
          return (
            <div className="like" key={like._id}>
              <Chat
                name={like.firstname + " " + like.lastname}
                message="message"
                timestamp="time taken"
                profilePic={like.imgUrl}
                id={like._id}
              />
              <div className="btns">
                <IconButton>
                  <HighlightOffIcon onClick={() => removeLikeSent(like._id)} />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
      <hr />
      <div className="likes">
        <h2>Received</h2>
        <hr />
        {likeR.map((like) => {
          return (
            <div className="like" key={like._id}>
              <Chat
                name={like.firstname + " " + like.lastname}
                message="message"
                timestamp="time taken"
                profilePic={like.imgUrl}
                id={like._id}
              />
              <div className="btns">
                <IconButton>
                  <AddCircleOutlineSharpIcon
                    onClick={() => addMatches(like._id)}
                  />
                </IconButton>
                <IconButton>
                  <HighlightOffIcon
                    onClick={() => removeLikeRecieve(like._id)}
                  />
                </IconButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Likes;
