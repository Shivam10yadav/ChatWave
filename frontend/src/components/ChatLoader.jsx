import { LoaderIcon, ShieldCheck, Terminal, Cpu } from "lucide-react";

function ChatLoader() {
  return (
    <div className="h-screen bg-base-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* AMBIENT BACKGROUND LOGIC */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(var(--bc) 1px, transparent 1px), linear-gradient(90deg, var(--bc) 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />

      {/* CENTRAL CORE LOADING */}
      <div className="relative mb-12">
        {/* ROTATING OUTER RING */}
        <div className="absolute -inset-6 border border-primary/20 rounded-full border-t-primary animate-[spin_2s_linear_infinite]" />
        
        {/* INNER STATIC CORE */}
        <div className="relative size-24 rounded-3xl bg-base-200 border border-base-content/5 flex items-center justify-center shadow-2xl">
          <LoaderIcon className="animate-[spin_4s_linear_infinite] size-10 text-primary" strokeWidth={1} />
        </div>

        {/* FLOATING STATUS BOX */}
        <div className="absolute -right-16 -top-4 bg-primary/10 border border-primary/20 px-3 py-1 rounded-md backdrop-blur-md">
            <span className="text-[8px] font-black uppercase tracking-widest text-primary animate-pulse">
              Encrypting_TLS
            </span>
        </div>
      </div>

      {/* TEXT DATA FIELD */}
      <div className="space-y-6 text-center">
        <div className="space-y-1">
          <h3 className="text-3xl font-black tracking-tighter uppercase italic">
            Establishing Link<span className="text-primary animate-pulse">...</span>
          </h3>
          <div className="flex items-center justify-center gap-2 opacity-40">
            <Terminal className="size-3" />
            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">
              Node: Private_Channel_Alpha
            </p>
          </div>
        </div>

        {/* SYSTEM SPECS (Decoration) */}
        <div className="flex gap-4 pt-4 border-t border-base-content/5">
           <div className="flex flex-col items-center gap-1">
              <ShieldCheck className="size-3 opacity-30 text-success" />
              <span className="text-[7px] font-black uppercase tracking-widest opacity-20">Secure</span>
           </div>
           <div className="flex flex-col items-center gap-1">
              <Cpu className="size-3 opacity-30 text-primary" />
              <span className="text-[7px] font-black uppercase tracking-widest opacity-20">Buffer_Clear</span>
           </div>
        </div>
      </div>

      {/* VERSION FOOTER */}
      <div className="absolute bottom-10">
        <p className="text-[9px] font-mono opacity-10 uppercase tracking-[0.5em]">
          Nexus_OS // Protocol_Loaded
        </p>
      </div>
    </div>
  );
}

export default ChatLoader;