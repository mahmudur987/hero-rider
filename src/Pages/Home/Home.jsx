import React, { useEffect, useState } from "react";
import Car from "./Car";

const Home = () => {
  const [cars, Setcars] = useState([]);
  useEffect(() => {
    let url = "https://hero-rider-server-mu.vercel.app/rentusers";
    fetch(url)
      .then((res) => res.json())
      .then((data) => Setcars(data));
  }, []);

  const rentCars = cars?.filter((car) => car.type === "rent");
  const teachCars = cars?.filter((car) => car.type === "teach");

  return (
    <div className="my-20">
      <div className="my-20">
        <h1 className="text-5xl font-extrabold text-center text-rose-700">
          For Rent{" "}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {rentCars?.map((car, idx) => (
            <Car key={idx} car={car} />
          ))}
        </div>
      </div>
      <div className="my-20">
        <h1 className="text-5xl font-extrabold text-center text-rose-700 my-5">
          To Learn Driving
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {teachCars?.map((car, idx) => (
            <Car key={idx} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
