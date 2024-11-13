/** Add your relevant code here for the issue to reproduce */

"use client";

import { useEffect, useState } from "react";
import Link from 'next/link';
import io from "socket.io-client";
import "./globals.css";

let socket;

export default function Home() {
  const [value, setValue] = useState("");

  const socketInitializer = async () => {
    // We call this just to make sure we turn on the websocket server
    await fetch("/api/socket");

    socket = io(undefined, {
      path: "/api/my_awesome_socket",
    });

    socket.on("connect", () => {
      console.log("Connected", socket.id);
    });

    socket.on("newIncomingMessage", (msg) => {
      console.log("New message in client", msg);
      setValue(msg);
    });
  };

  const sendMessageHandler = async (e) => {
    if (!socket) return;
    const value = e.target.value;
    socket.emit("createdMessage", value);
  };

  useEffect(() => {
    socketInitializer();
  }, []);

  return (
    <main className="flex min-h-screen flex-col gap-8 items-center justify-start p-24 bg-pink-50">
      <p>
        Socket.io (4.7.2) with Next.js latest version (13.5.4) is working back again like charm.
      </p>
      <p>
        Thanks to <Link href="https://github.com/huozhi" target="_blank" className="text-blue-500 underline">Jiachi Liu</Link> & the team of Next.js.
      </p>
      <p>
        And a Special Thanks to <Link href="https://github.com/leerob" target="_blank" className="text-blue-500 underline">Lee Robinson</Link> for helping me to create the issue page for resolving this issue.
      </p>
      <p>Lots of ❤️ for the great Next.js Community.</p>
      <input
        value={value}
        onChange={sendMessageHandler}
        className="w-full h-12 px-2 mt-auto rounded"
        placeholder="Enter some text and see the syncing of text in another tab"
      />
    </main>
  );
}
