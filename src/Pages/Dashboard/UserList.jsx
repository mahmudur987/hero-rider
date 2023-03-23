import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../../Context/UserContext";

const UserList = () => {
  const { Setsearch } = useContext(authContext);
  const [users, Setusers] = useState([]);
  const [ids, Setids] = useState([]);
  const [blockUsers, SetblockUsers] = useState([]);
  const [sort, setsort] = useState([]);
  const [count, Setcount] = useState(0);
  const [page, Setpage] = useState(0);
  const [size, Setsize] = useState(5);
  const pages = Math.ceil(count / size);
  useEffect(() => {
    let url = `https://hero-rider-server-mu.vercel.app/allusers?page=${page}&size=${size}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const goodusers = data.result.filter((user) => user.block === false);
        const blockusers = data.result.filter((user) => user.block === true);
        Setcount(data.count);
        Setusers(goodusers);
        SetblockUsers(blockusers);
      });
  }, [page, size]);

  const sortUser = (a, b) => {
    const sorting = users.filter((user) => user.age >= a && user.age <= b);
    setsort(sorting);
  };
  let content;
  if (users.length) {
    content = users.map((user, idx) => (
      <tr key={idx}>
        <th>{idx + 1}</th>
        <td>
          {" "}
          <input onClick={() => markuser(user._id)} type="checkbox" />
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
  let blockContent;
  if (blockUsers.length) {
    blockContent = blockUsers.map((user, idx) => (
      <tr key={idx}>
        <th>{idx + 1}</th>

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
            <input onClick={() => markuser(user._id)} type="checkbox" />
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
        const newuserlist = users.filter((user) => user._id !== id);
        Setusers(newuserlist);
        const user = users.find((user) => user._id === id);
        user.block = true;
        SetblockUsers([...blockUsers, user]);
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
        const newuserlist = blockUsers.filter((user) => user._id !== id);
        SetblockUsers(newuserlist);
        const user = blockUsers.find((user) => user._id === id);
        user.block = false;
        Setusers([...users, user]);
      });
  };
  const markuser = (id) => {
    const newids = [...ids, id];
    Setids(newids);
  };

  const manyBlock = () => {
    let url = `https://hero-rider-server-mu.vercel.app/users`;
    fetch(url, {
      method: "PATCH", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: ids, update: { block: true } }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          ids.map((id) => {
            const newusers = users.filter((user) => user._id !== id);
            Setusers(newusers);
            co;
            console.log(newusers);
          });
        }
      });
  };

  return (
    <>
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
          {ids.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={() => manyBlock()}
                className="btn btn-outline font-extrabold"
              >
                Block all
              </button>
            </div>
          )}
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

      <div className="flex justify-center">
        <div>
          <h1 className="text-4xl text-center  font-extrabold text-pink-700 my-5">
            Block Users
          </h1>
          <div className="overflow-x-auto">
            <table className="table w-full">
              {/* head */}
              <thead>
                <tr>
                  <th>Si No</th>

                  <th>Name</th>
                  <th>Phone</th>
                  <th>Age</th>
                  <th>Role</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>{blockContent}</tbody>
            </table>
            {/* {ids.length > 0 && (
          <div className="flex justify-end">
            <button
              onClick={() => manyBlock()}
              className="btn btn-outline font-extrabold"
            >
              UnBlock all
            </button>
          </div>
        )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;
