import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";

const UserList = () => {
  const [users, Setusers] = useState([]);
  const [sort, setsort] = useState([]);
  const [count, Setcount] = useState(0);

  const [page, Setpage] = useState(0);

  const [size, Setsize] = useState(5);
  const pages = Math.ceil(count / size);
  // console.log(pages);
  useEffect(() => {
    let url = `https://hero-rider-server-mu.vercel.app/allusers?page=${page}&size=${size}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        Setusers(data.result);
        Setcount(data.count);
      });
  }, [page, size]);
  let content;

  const sortUser = (a, b) => {
    const sorting = users.filter((user) => user.age >= a && user.age <= b);
    setsort(sorting);
  };
  console.log(sort);
  if (users.length) {
    content = users
      .sort((x, y) => x._id - y._id)
      .map((user, idx) => (
        <tr key={idx}>
          <th>{idx + 1}</th>
          <td>
            {" "}
            <input
              onClick={() => markuser(user._id)}
              type="checkbox"
              checked={user.mark === true}
              name=""
              id=""
            />
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
  if (sort.length > 0) {
    content = sort
      .sort((x, y) => x._id - y._id)
      .map((user, idx) => (
        <tr key={idx}>
          <th>{idx + 1}</th>
          <td>
            {" "}
            <input
              onClick={() => markuser(user._id)}
              type="checkbox"
              checked={user.mark === true}
              name=""
              id=""
            />
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
  // console.log(users);

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
  const markuser = (id) => {
    const user = users.find((user) => user._id === id);
    if (user.mark === true) {
      let url = `https://hero-rider-server-mu.vercel.app/user/${id}`;
      fetch(url, {
        method: "PATCH", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mark: false }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const user = users.find((user) => user._id === id);
          user.mark = true;
          const newuserlist = users.filter((user) => user._id !== id);
          newuserlist.push(user);
          Setusers(newuserlist);
        });
    } else {
      let url = `https://hero-rider-server-mu.vercel.app/user/${id}`;
      fetch(url, {
        method: "PATCH", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mark: true }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const user = users.find((user) => user._id === id);
          user.mark = true;
          const newuserlist = users.filter((user) => user._id !== id);
          newuserlist.push(user);
          Setusers(newuserlist);
        });
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <div className="flex gap-7">
          <p>sort by age</p>
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
          </button>
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
      <div className="pagination my-10 flex flex-col items-center ">
        <p>current page number {page + 1}</p>

        <p className="flex">
          {[...Array(pages).keys()].map((number) => (
            <button
              key={number}
              onClick={() => Setpage(number)}
              className={(page === number && "selected") || "mx-5 flex"}
            >
              {" "}
              {number + 1}{" "}
            </button>
          ))}
        </p>

        <select
          className="mx-5 rounded-lg bg-slate-400"
          onChange={(event) => Setsize(event.target.value)}
        >
          <option value="5">5</option>

          <option value="10">10</option>

          <option value="15">15</option>

          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default UserList;
