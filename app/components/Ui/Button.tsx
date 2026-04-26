import React from "react";
type ButtonProps = {
  colorButton: {
    backgroundColor: "bg-purple" | "bg-black" | "bg-green" | "bg-white";
    textColor: "text-white" | "text-black";
    hover: boolean;
  };
  children: React.ReactNode;
  rounded: "rounded-none" | "rounded-sm" | "rounded-button-circle";
  size: string;
};
export default function Button(props: ButtonProps) {
  const { colorButton, children, rounded, size } = props;
  const { backgroundColor, textColor, hover } = colorButton;
  const IsButtonHover = hover ? "hover:bg-yellow active:bg-red" : "";
  // const IsButtonHover = hoverColor === "hover" ? "hover:bg-red-500" : "";

  return (
    <button
      className={`
        cursor-pointer outline-none ${backgroundColor} ${textColor} ${IsButtonHover} ${size} ${rounded}
        `}
    >
      {children}
    </button>
  );
}
