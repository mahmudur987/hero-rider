import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/UserContext";

const SignUp = () => {
  const { signUp, updateUserProfile, loading, Setloading } =
    useContext(authContext);
  const [Error, SetError] = useState("");
  const [vehicleType, SetvehicleType] = useState("");
  const naviget = useNavigate();
  Setloading(false);
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    let url =
      "https://api.imgbb.com/1/upload?key=3559b6c20b5de4448f640124cb537f31";
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);
    return data.data.url;
  };
  const handleSignup = async (e) => {
    Setloading(true);
    e.preventDefault();
    const form = e.target;
    const password = form.password.value;
    const confirmpassword = form.confirmpassword.value;
    if (password !== confirmpassword) {
      SetError("password doesnot match");
      return;
    }
    const type = "rent";
    const price = form.price.value;
    const profilepic = await uploadImage(form.profilepic.files[0]);
    const age = form.age.value;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const registered = new Date().toJSON();
    const drivingLipic = await uploadImage(form.drivingLipic.files[0]);
    const nidpic = await uploadImage(form.nidpic.files[0]);
    const rideArea = form.rideArea.value;
    const carName = form.carName.value;
    const carModel = form.carModel.value;
    const NumberPlate = form.NumberPlate.value;
    const carPic = await uploadImage(form.carPic.files[0]);
    const carInfo = { carName, carModel, NumberPlate, carPic };
    const role = "rider";
    const rentUser = {
      type,
      vehicleType,
      price,
      profilepic,
      age,
      name,
      email,
      phone,
      address,
      registered,
      drivingLipic,
      nidpic,
      carInfo,
      rideArea,
      password,
      role,
    };
    if (password === confirmpassword) {
      signUp(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          // console.log(user);

          if (user) {
            updateProfile(name, profilepic);
            saveUser(rentUser);

            //  form.reset();
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          SetError(errorMessage);
        });
    }

    console.log(rentUser);
  };
  const updateProfile = (displayName, photoURL) => {
    const profile = { displayName, photoURL };
    updateUserProfile(profile)
      .then(() => {})
      .catch((err) => {
        toast.error(err.message);
        console.error(err);
      });
  };

  const saveUser = (fullprofile) => {
    // console.log(fullprofile);
    fetch(`https://hero-rider-server-mu.vercel.app/rentusers`, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullprofile),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Save user", data);
        if (data.acknowledged) {
          toast.success("user signup successfully");
        }
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Error:", error);
      });
    toast.success("user signup successfully");
    naviget("/");
    Setloading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <progress
          className="progress progress-secondary w-56"
          value="0"
          max="100"
        ></progress>
        <progress
          className="progress progress-secondary w-56"
          value="10"
          max="100"
        ></progress>
        <progress
          className="progress progress-secondary w-56"
          value="40"
          max="100"
        ></progress>
        <progress
          className="progress progress-secondary w-56"
          value="70"
          max="100"
        ></progress>
        <progress
          className="progress progress-secondary w-56"
          value="100"
          max="100"
        ></progress>
      </div>
    );
  }
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content flex-col ">
        <div className="text-center ">
          <h1 className="text-5xl font-bold">Sign Up As A Rider</h1>
          <p className="py-6">
            Enter your information here. Be sure to provide correct information.
            Your information will be verified. If the information provided by
            you is correct, you will be included in our program very soon
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl ">
          <form onSubmit={handleSignup}>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 w-full p-5 ">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="name"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your age</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="age"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="number"
                  placeholder="phone Number"
                  className="input input-bordered"
                  name="phone"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="address"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Picture</span>
                </label>
                <input
                  type="file"
                  className="input input-bordered"
                  name="profilepic"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image 1st page of NID</span>
                </label>
                <input
                  type="file"
                  className="input input-bordered"
                  name="nidpic"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image of Driving licence</span>
                </label>
                <input
                  type="file"
                  className="input input-bordered"
                  name="drivingLipic"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Driving Area</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="rideArea"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price per day</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="price"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Car Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="carName"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Car Model</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="carModel"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Number Plate</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  name="NumberPlate"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Car Picture</span>
                </label>
                <input
                  type="file"
                  className="input input-bordered"
                  name="carPic"
                />
              </div>
              <div className="form-contro">
                <select
                  onChange={(e) => SetvehicleType(e.target.value)}
                  className="select my-auto select-bordered w-full "
                >
                  <option disabled selected>
                    vehicle type
                  </option>
                  <option value="car">Car</option>
                  <option value="bike">MOtor Bike</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="text"
                  placeholder="password"
                  className="input input-bordered"
                  name="password"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="text"
                  placeholder=" Confirm password"
                  className="input input-bordered"
                  name="confirmpassword"
                />
              </div>
            </div>
            <label className="label">
              <span className="label-text text-red-500">{Error}</span>
            </label>
            <div className="form-control w-32 my-6 mx-auto">
              <button className="btn btn-accent ">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
