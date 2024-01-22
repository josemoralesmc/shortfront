import React from 'react'
import { useRef } from "react";

const UrlDetail = ({ data, onRemove }: any) => {
  const divRef = useRef<HTMLDivElement>(null);


  return (
    <div
      ref={divRef}
      className="relative flex h-48 w-96 mt-10 ml-10 items-end justify-start overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-r from-black to-slate-950 px-8 py-16 shadow-2xl"
    >
      <div  className="pointer-events-none absolute -inset-px opacity-0 transition duration-300" />
      <div className="mt-20">
        <a href={data.full_url} target="_bla">
          
          <h2
            className="text-2xl font-bold text-white mb-2 self-start cursor-pointer hover:underline"
          >
            {data.short_url}
          </h2>
        </a>
        <p className="text-sm text-slate-200 mb-4">{data.full_url}</p>
        <div >
          <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <div
              onClick={onRemove}
              className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950/90 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl"
            >
              Remove
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default UrlDetail;
