/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {}
  };
  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
      {session ? (
        <div>Welcom</div>
      ) : (
        <div>
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
