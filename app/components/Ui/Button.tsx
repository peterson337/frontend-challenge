import React from "react";
type ButtonProps = {
  colorButton: {
    backgroundColor: "bg-purple" | "bg-black" | "bg-green" | "bg-white";
    textColor: "text-white" | "text-black";
    hover: boolean;
    fontFamily?: string;
    fontWeight?: string;
    width?: string;
    border?: string;
  };
  children: React.ReactNode;
  rounded: "rounded-none" | "rounded-sm" | "rounded-button-circle";
  size: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
export default function Button(props: ButtonProps) {
  const { colorButton, children, rounded, size, onClick } = props;
  const { backgroundColor, textColor, hover, fontFamily, fontWeight, width, border } =
    colorButton;
  const IsButtonHover = hover ? "hover:bg-yellow active:bg-red" : "";

  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer outline-none ${backgroundColor} ${textColor} ${IsButtonHover} ${size} ${rounded} ${fontWeight} 
        ${fontFamily} ${width} ${border}
        `}
    >
      {children}
    </button>
  );
}
