import { BellIcon, Radio } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in zoom-in duration-700">
      {/* SCANNING RADAR EFFECT */}
      <div className="relative mb-10">
        {/* PULSING RINGS */}
        <div className="absolute inset-0 size-20 rounded-full border border-primary/20 animate-ping" />
        <div className="absolute inset-0 size-20 rounded-full border border-primary/10 animate-[ping_3s_linear_infinite]" />
        
        {/* ICON CONTAINER */}
        <div className="relative size-20 rounded-3xl bg-base-200 border border-base-content/5 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl shadow-primary/5">
          <BellIcon className="size-10 text-primary opacity-20" strokeWidth={1} />
        </div>

        {/* SMALL FLOATING STATUS */}
        <div className="absolute -bottom-2 -right-2 bg-base-100 border border-base-content/10 px-2 py-1 rounded-md shadow-sm flex items-center gap-1.5">
          <div className="size-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[8px] font-black uppercase tracking-widest opacity-40">Listening</span>
        </div>
      </div>

      {/* TEXT CONTENT */}
      <div className="space-y-4 px-6">
        <h3 className="text-2xl font-black tracking-tighter uppercase italic">
          Zero Signals<span className="text-primary opacity-50">_</span>
        </h3>
        
        <div className="max-w-xs mx-auto space-y-4">
          <p className="text-[11px] font-medium leading-relaxed opacity-40 uppercase tracking-widest">
            Your encrypted activity feed is currently dormant. New connection requests and system alerts will manifest here.
          </p>
          
          {/* DECORATIVE TERMINAL LINE */}
          <div className="flex items-center justify-center gap-2 opacity-20">
            <div className="h-[1px] w-8 bg-base-content" />
            <Radio className="size-3" />
            <div className="h-[1px] w-8 bg-base-content" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoNotificationsFound;