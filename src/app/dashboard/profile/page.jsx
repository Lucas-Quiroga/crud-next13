"use client";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  console.log(session, status);
  return (
    <div>
      <h1 style={{ color: "black" }}>Profile</h1>
      <pre style={{ color: "black" }}>
        {JSON.stringify({ session, status }, null, 2)}
      </pre>

      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default ProfilePage;
