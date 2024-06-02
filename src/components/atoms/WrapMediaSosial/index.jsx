import React from "react";
import { FcGoogle } from "react-icons/fc";
import { TiVendorApple } from "react-icons/ti";

function WrapMediaSosial() {
  return (
    <section className=" flex flex-col gap-2">
      <p>instanly login or sign up via google</p>
      <div className=" flex gap-4 flex-col md:flex-row">
        <button className="flex-1 border px-4 py-4 flex  justify-center items-center gap-2">
          <FcGoogle />
          <span className=" text-desktopH6">CONTINUE WITH GOOGLE </span>
        </button>
        <button className="flex-1 border px-4 py-4 flex justify-center items-center gap-2">
          <TiVendorApple />
          <span className=" text-desktopH6">CONTINUE WITH APPLE </span>
        </button>
      </div>
    </section>
  );
}

export default WrapMediaSosial;
