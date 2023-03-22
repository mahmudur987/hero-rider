import { useEffect, useState } from "react";

export const useAdmin = (email) => {
  const [admin, Setadmin] = useState(null);
  const [adminLoading, Setadminloading] = useState(true);
  useEffect(() => {
    fetch(`https://repliq-e-commerce-server.vercel.app/
users?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.userType === "admin") {
          Setadmin(data);
          Setadminloading(false);
        }
      });
  }, [email]);
  return [admin, adminLoading];
};
