import React from "react";
type ButtonProps = {
  colorButton: {
    backgroundColor: "bg-purple" | "bg-black" | "bg-green" | "bg-white";
    textColor: "text-white" | "text-black";
    hover: boolean;
    fontFamily?: string;
    fontWeight?: string;
  };
  children: React.ReactNode;
  rounded: "rounded-none" | "rounded-sm" | "rounded-button-circle";
  size: string;
};
export default function Button(props: ButtonProps) {
  const { colorButton, children, rounded, size } = props;
  const { backgroundColor, textColor, hover, fontFamily, fontWeight } =
    colorButton;
  const IsButtonHover = hover ? "hover:bg-yellow active:bg-red" : "";

  return (
    <button
      className={`
        cursor-pointer outline-none ${backgroundColor} ${textColor} ${IsButtonHover} ${size} ${rounded} ${fontWeight} 
        ${fontFamily}
        `}
    >
      {children}
    </button>
  );
}
