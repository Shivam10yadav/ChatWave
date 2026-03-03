import { UsersIcon, Radio, PlusCircle } from "lucide-react";

const NoFriendsFound = () => {
  return (
    <div className="relative group overflow-hidden bg-base-200/30 border border-dashed border-base-content/10 rounded-[3rem] p-12 sm:p-20 text-center transition-all duration-500 hover:border-primary/30">
      
      {/* DECORATIVE BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(var(--bc) 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
      />

      <div className="relative z-10 flex flex-col items-center max-w-sm mx-auto">
        
        {/* NETWORK ICON WITH CONNECTION LINES */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
          
          <div className="relative size-24 rounded-full bg-base-100 border border-base-content/5 flex items-center justify-center shadow-2xl">
            <UsersIcon className="size-10 text-primary opacity-40 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
            
            {/* FLOATING ORBITALS */}
            <div className="absolute -top-1 -right-1 size-4 rounded-full bg-base-300 border border-base-content/10 flex items-center justify-center animate-bounce">
                <PlusCircle className="size-3 text-primary" />
            </div>
          </div>
        </div>

        {/* TEXT CONTENT */}
        <div className="space-y-4">
          <div className="space-y-1">
            <h3 className="text-3xl font-black tracking-tighter uppercase italic">
              Network Offline<span className="text-primary animate-pulse">_</span>
            </h3>
            <div className="flex items-center justify-center gap-2">
                <div className="h-[1px] w-4 bg-primary/40" />
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] opacity-40">
                    Node: 00-Primary
                </p>
                <div className="h-[1px] w-4 bg-primary/40" />
            </div>
          </div>

          <p className="text-sm font-medium leading-relaxed opacity-60">
            No active language partners detected in your inner circle. Synchronize with global learners below to initialize your first connection.
          </p>

          {/* ACTION HINT */}
          <div className="pt-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Radio className="size-3 text-primary animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-widest text-primary">
                Scanning for new partners...
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CORNER DECORATIONS (The "Technical" touch) */}
      <div className="absolute top-6 left-6 size-4 border-t-2 border-l-2 border-base-content/10 group-hover:border-primary/40 transition-colors" />
      <div className="absolute bottom-6 right-6 size-4 border-b-2 border-r-2 border-base-content/10 group-hover:border-primary/40 transition-colors" />
    </div>
  );
};

export default NoFriendsFound;