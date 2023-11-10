import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { userApi } from "../services/UserApi";

const Profile = () => {
  const location = useLocation();

  const [User, setUser] = useState([]);
  useEffect(() => {
    async function fetchUser() {
      await userApi.fetchUser(
        () => {},
        (data) => setUser(data),
        () => alert("sonething went wrong")
      );
    }
    fetchUser();
  }, []);
  const logout = (e) => {
    e.preventDefault();
    userApi.logout();
    location.replace("/users");
  };
  return (
    <div className="profile container-fluid">
      <div className="row describe">
        <div
          className="profile__img col-5"
          style={{ backgroundImage: `url(${User.imgUrl})` }}
        >
          {" "}
        </div>
        <div className=" profile__details col-7">
          <label>Name {User.firstname + " " + User.lastname}</label>
          <label>Email {User.email}</label>
          <label>Gender and Age {User.gender + " " + User.age}</label>
          <label> {User.email}</label>
        </div>
      </div>

      <button onClick={logout}>LOGOUT</button>
    </div>
  );
};

export default Profile;
