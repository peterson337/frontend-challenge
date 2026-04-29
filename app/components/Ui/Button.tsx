import React from "react";
type ButtonProps = {
  colorButton: {
    backgroundColor: "bg-purple" | "bg-black" | "bg-green" | "bg-white";
    textColor: "text-white" | "text-black";
    hover: boolean;
  };
  children: React.ReactNode;
  rounded: "rounded-none" | "rounded-sm" | "rounded-button-circle";
  size?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  shadow?: string;
  width?: string;
  heigth?: string;  
  border?: string;
  fontFamily?: string;
  fontWeight?: string;
  display?: string;
};
export default function Button(props: ButtonProps) {
  const { colorButton, children, rounded, size, onClick, shadow, width, border, fontFamily, fontWeight, display, heigth } = props;
  const { backgroundColor, textColor, hover} = colorButton;
  const IsButtonHover = hover ? "hover:bg-yellow active:bg-red" : "";

  return (
    <button
      onClick={onClick}
      className={`
        cursor-pointer outline-none ${backgroundColor} ${textColor} ${IsButtonHover} ${size} ${rounded} ${fontWeight} 
        ${fontFamily} ${width} ${border} ${shadow} ${display} ${heigth}
        `}
    >
      {children}
    </button>
  );
}
