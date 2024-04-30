"use client";
import { signOut } from "next-auth/react";

export default function dashboard() {
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-white text-3xl">DASHBOARD</h1>
        <button
          className="bg-white hover:bg-gray-100 text-gray-900 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          onClick={() => signOut()}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
