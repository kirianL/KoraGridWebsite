import React from "react";
import { ANNOUNCEMENT_DATA } from "../data/koragrid";
import { ChevronRightIcon } from "./Icons";

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#15803d] via-[#22c55e] to-[#16a34a] text-[#051b0e]">
      <div className="mx-auto flex max-w-[1180px] items-center justify-center gap-2 px-4 py-1.5 text-center text-[12px] font-medium leading-tight sm:text-[13px]">
        <span>{ANNOUNCEMENT_DATA.text}</span>
        <a
          href={ANNOUNCEMENT_DATA.href}
          className="inline-flex items-center gap-0.5 font-semibold underline decoration-[#051b0e]/40 underline-offset-2 hover:decoration-[#051b0e]"
        >
          {ANNOUNCEMENT_DATA.cta}
          <ChevronRightIcon className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
};
