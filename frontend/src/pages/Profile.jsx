import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/user/me", {
      method: "GET",
      credentials: "include"
    })
      .then(res => {
        if (res.status === 200) return res.json();
        throw new Error("Not authenticated");
      })
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  if (!user) return <div>Please log in</div>;

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
      <p>Email: {user.email}</p>
      {/* Render other user info here */}
    </div>
  );
}

export default Profile; 