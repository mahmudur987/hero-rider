import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { cheakUser } from "../../components/cheakUser";
import { authContext } from "../../Context/UserContext";

const LogIn = () => {
  const { user, login, Setloading, loading } = useContext(authContext);
  const [Error, SetError] = useState("");

  const naviget = useNavigate();

  console.log(user);

  const handleLogin = (e) => {
    Setloading(true);
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    login(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        naviget("/profile");
      })
      .then((err) => console.error(err));
    console.log(email, password);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div
          className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
          role="status"
        >
          <span className="visually-hidden">O</span>
        </div>
      </div>
    );
  }

  return (
    <div className="hero min-h-[600px]  bg-base-200">
      <div className="hero-content flex-col max-w-[500px] ">
        <div className="text-center lg:text-left ">
          <h1 className="text-5xl font-bold ">Log In now!</h1>
        </div>
        <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                name="email"
                required
              />
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
                required
              />
            </div>
            <p className="text-secondary">{Error}</p>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
