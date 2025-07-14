import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowBigLeft } from "lucide-react";

function BackButton() {
  const navigate = useNavigate();
  return (
    <div className="bg-[var(--light-color)] h-[100px] flex justify-between relative cursor-pointer">
      <div className="max-w-6xl w-full mx-auto px-4 py-4 flex justify-between items-center">
        <button
          className="bg-white/20 py-2 px-4 alignn-start inline-flex w-[200px] rounded-sm items-center justify-around capitalize font-bold text-white shadow-xl cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <ArrowBigLeft />
          previous page
        </button>
      </div>
    </div>
  );
}

export default BackButton;
