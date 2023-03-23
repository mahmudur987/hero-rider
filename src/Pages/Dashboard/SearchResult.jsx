import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/UserContext";

const SearchResult = () => {
  const { search, Setsearch } = useContext(authContext);
  const [users, Setusers] = useState([]);

  console.log(users);

  useEffect(() => {
    let url = `https://hero-rider-server-mu.vercel.app/search/${search}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Setusers(data);
      });
  }, [search]);
  const blockuser = (id) => {
    let url = `https://hero-rider-server-mu.vercel.app/user/${id}`;
    fetch(url, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ block: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const user = users.find((user) => user._id === id);
        user.block = true;
        const newuserlist = users.filter((user) => user._id !== id);
        newuserlist.push(user);
        Setusers(newuserlist);
      });
  };

  const unblockuser = (id) => {
    let url = `https://hero-rider-server-mu.vercel.app/user/${id}`;
    fetch(url, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ block: false }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const user = users.find((user) => user._id === id);
        user.block = false;
        const newuserlist = users.filter((user) => user._id !== id);
        newuserlist.push(user);
        Setusers(newuserlist);
      });
  };
  let content;
  if (search) {
    content = users
      .sort((x, y) => x._id - y._id)
      .map((user, idx) => (
        <tr key={idx}>
          <th>{idx + 1}</th>
          <td>
            {" "}
            <input type="checkbox" checked={user.mark === true} name="" id="" />
          </td>
          <td>{user?.name}</td>
          <td>{user?.phone}</td>
          <td>{user?.age}</td>
          <td>{user?.role}</td>
          <td>
            {user.block ? (
              <button
                onClick={() => unblockuser(user._id)}
                className="btn btn-accent btn-sm"
              >
                Unblock
              </button>
            ) : (
              <button
                onClick={() => blockuser(user._id)}
                className="btn btn-accent btn-sm"
              >
                Block
              </button>
            )}
          </td>
        </tr>
      ));
  }
  return (
    <div>
      <div className="flex justify-between my-5 items-center">
        <div className="form-control">
          <label className="input-group">
            <input
              onChange={(e) => Setsearch(e.target.value)}
              type="text"
              placeholder="name/email/phone"
              className="input input-bordered"
            />
            <span>
              <Link to={"/dashboard/search"}>search</Link>
            </span>
          </label>
        </div>
        <div className="flex gap-7">
          {/* <p>sort by age</p>
          <button
            onClick={() => sortUser(20, 30)}
            className="btn btn-ghost btn-sm"
          >
            age :20-30
          </button>
          <button
            onClick={() => sortUser(31, 40)}
            className="btn btn-ghost btn-sm"
          >
            age :30-40
          </button> */}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th>Si No</th>
              <th>Select</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Role</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchResult;
