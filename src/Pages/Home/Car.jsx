import React from "react";

const Car = ({ car }) => {
  const { carInfo, price, name, phone } = car;
  // console.log(car);

  return (
    <div className="card card-compact  bg-base-100 shadow-xl">
      <figure className="p-2 min-h-[100px] ">
        <img className="w-full h-80" src={carInfo?.carPic} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {carInfo?.carName}
          <p className="font-bold">{carInfo?.carModel}</p>
        </h2>
        <p className="font-bold">Dhaka-Metro-ta-{carInfo?.NumberPlate}</p>
        <p>Driver Name : {name} </p>
        <p>Phone Number : {phone} </p>
        <p>Price : {price} \day</p>

        <div className="card-actions justify-end">
          <button className="btn btn-info">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default Car;
