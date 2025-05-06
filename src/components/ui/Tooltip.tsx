import React from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="group relative inline-block cursor-help">
      {children}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-black text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
        {content}
      </div>
    </div>
  );
};

export default Tooltip;
