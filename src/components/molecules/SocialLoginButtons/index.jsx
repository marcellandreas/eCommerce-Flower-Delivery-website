import React from "react";
import Text from "../../atoms/Text";
import { AppleIcon, GoogleIcon } from "../../atoms/Icon";

export const SocialLoginButtons = () => {
  return (
    <section className=" flex flex-col gap-2">
      <Text level="body">instanly login or sign up via Google</Text>
      <div className=" flex gap-4 flex-col md:flex-row">
        <button className="flex-1 border px-4 py-4 flex  justify-center items-center gap-2">
          <GoogleIcon />
          <Text level="h6">CONTINUE WITH GOOGLE </Text>
        </button>
        <button className="flex-1 border px-4 py-4 flex justify-center items-center gap-2">
          <AppleIcon />
          <Text level="h6">CONTINUE WITH APPLE </Text>
        </button>
      </div>
    </section>
  );
};
