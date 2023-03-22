import React, { useContext, useEffect, useState } from "react";
import UserContext, { authContext } from "../../Context/UserContext";

const Profile = () => {
  const { user } = useContext(authContext);
  const [profile, Setprofile] = useState({});

  console.log(profile);
  const {
    name,
    email,
    phone,
    address,
    age,
    nidpic,
    drivingLipic,
    profilepic,
    carInfo,
    type,
    vehicleType,
    rideArea,
    role,
  } = profile;
  useEffect(() => {
    const url = `https://hero-rider-server-mu.vercel.app/rentuser?name=${user?.displayName}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => Setprofile(data));
  }, [user]);

  return (
    <div className="flex justify-center my-20">
      <div className="flex flex-col gap-6">
        <p className="text-2xl">
          Profile picture
          <img className=" max-w-md min-h-[100px]" src={profilepic} />
        </p>
        <p className="text-2xl">
          Image of NID Card
          <img className=" max-w-md min-h-[100px]" src={nidpic} />
        </p>
        {role !== "learner" && (
          <p className="text-2xl">
            Image of Licence
            <img className=" max-w-md min-h-[100px]" src={drivingLipic} />
          </p>
        )}
        {role !== "learner" && (
          <p className="text-2xl">
            Image of vehicle
            <img className=" max-w-md min-h-[100px]" src={carInfo?.carPic} />
          </p>
        )}
        <p className="text-2xl">Name :{name} </p>
        <p className="text-2xl">Age :{age} </p>
        <p className="text-2xl">Phone Number :{phone}</p>
        <p className="text-2xl">Email : {email} </p>
        <p className="text-2xl">Address :{address} </p>
        {role !== "learner" && (
          <p className="text-2xl">Prefarable Area :{rideArea} </p>
        )}
        {role !== "learner" && (
          <p className="text-2xl">Service Type :{type} </p>
        )}
        <p className="text-2xl">vehicle Type : {vehicleType} </p>
      </div>
    </div>
  );
};

export default Profile;
