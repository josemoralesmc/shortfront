import React from 'react'
import { PaperClipIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const NoLinks = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
        <PaperClipIcon className="h-10 w-10 flex-shrink-0 text-gray-300"
                    aria-hidden="true"/>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-300">
        Lets create your first link!
      </h2>
      <Link to={'/create'}>
        <span className="relative inline-block overflow-hidden rounded-full p-[1px] mt-10">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/90 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Create New Url
          </div>
        </span>
      </Link>
    </div>
  );
};

export default NoLinks;
