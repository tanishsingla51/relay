"use client";

import React from "react";
import Navbar from "@/components/navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import RoomsComponent from "@/components/roomsComponent";

const Page = () => {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <Navbar />
      <RoomsComponent />
    </div>
  );
};

export default Page;
