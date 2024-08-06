import React from "react";

const Instructions = () => {
  return (
    <div className="absolute top-[30px] left-[30px] flex gap-3 items-center">
      <div className="flex flex-col gap-1 items-center">
        <div>
          <p className="instruction_btns">W</p>
        </div>
        <div className="flex gap-1">
          <p className="instruction_btns">A</p>
          <p className="instruction_btns">S</p>
          <p className="instruction_btns">D</p>
        </div>
      </div>
      <div>
        <p>to roll.</p>
      </div>
    </div>
  );
};

export default Instructions;
