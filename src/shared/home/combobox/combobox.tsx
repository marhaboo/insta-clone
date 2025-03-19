"use client"
import React, { useState } from "react";
import clsx from "clsx";
interface ComboBoxInterFace {
  options: string[];
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  onchange?: (value: string) => void;
}
const ComboBox: React.FC<ComboBoxInterFace> = ({
  options,
  placeholder,
  size = "md",
  onchange,
}) => {
  const [open, setOpen] = useState(false);
  const [selectOption, setSelectOption] = useState<string | null>(null);

  const dropdown = () => setOpen(!open);
  const optionClick = (option: string) => {
    setSelectOption(option);
    setOpen(false);
    onchange?.(option);
  };
  const sizeStyle = {
    sm: "text-sm py-1 px-2",
    md: "text-base py-2 px-3",
    lg: "text-lg py-3 px-4",
  };
  return (
    <>
    {/* select item */}
      <div className="relative w-64">
        <button className={clsx("w-full border border-gray-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500",sizeStyle[size])} onClick={dropdown}>{selectOption || placeholder}</button>
           {/* dropdown */}
           {open && <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {options.map((el,i)=>{
                return <li key={i} className="cursor-pointer px-4 py-2 hover:bg-gray-100" onClick={()=>optionClick(el)}>{el}</li>
            })}
            </ul>}
      </div>
    </>
  );
};

export default ComboBox