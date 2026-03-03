import { LoaderPinwheelIcon, Zap, ShieldCheck } from 'lucide-react';
import React from 'react';
import { useThemeStore } from '../store/useThemeStore';

const PageLoader = () => {
  const { theme } = useThemeStore();

  return (
    <div 
      className="min-h-screen bg-base-100 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500" 
      data-theme={theme}
    >
      {/* SCANNING GRID EFFECT (Background) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(var(--bc) 1px, transparent 1px), linear-gradient(90deg, var(--bc) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* CENTRAL CORE */}
      <div className="relative group">
        {/* GLOW BACKGROUND */}
        <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full animate-pulse" />
        
        {/* THE ICON */}
        <div className="relative bg-base-100 p-8 rounded-[2.5rem] border border-base-content/5 shadow-2xl">
          <LoaderPinwheelIcon 
            className="animate-[spin_3s_linear_infinite] size-16 text-primary" 
            strokeWidth={1.5}
          />
        </div>

        {/* ORBITING DOTS (Decorative) */}
        <div className="absolute -inset-4 border border-dashed border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
      </div>

      {/* TECHNICAL OVERLAY TEXT */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="flex items-center gap-3">
          <Zap className="size-4 text-primary animate-pulse" />
          <h2 className="text-2xl font-black italic tracking-tighter uppercase">
            Nexus<span className="text-primary">.</span>OS
          </h2>
        </div>

        {/* STATUS LOGS */}
        <div className="flex flex-col items-center space-y-1">
          <div className="flex items-center gap-2">
             <ShieldCheck className="size-3 text-success opacity-80" />
             <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] opacity-40">
               Establishing Secure Uplink
             </span>
          </div>
          
          {/* PROGRESS BAR (Indeterminate) */}
          <div className="w-48 h-[2px] bg-base-content/5 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-primary animate-[translateX_1.5s_infinite_linear]" 
                 style={{ width: '40%', transform: 'translateX(-100%)' }} />
          </div>
        </div>
      </div>

      {/* FOOTER METADATA */}
      <div className="absolute bottom-10 flex gap-10">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-widest opacity-20">Version</p>
            <p className="text-[10px] font-mono opacity-40">v3.0.26-ALPHA</p>
         </div>
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-widest opacity-20">Kernel</p>
            <p className="text-[10px] font-mono opacity-40">Node_JS/React</p>
         </div>
      </div>

      {/* CUSTOM KEYFRAME ANIMATION (Add to your global CSS if needed, or use Tailwind config) */}
      <style jsx>{`
        @keyframes translateX {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
};

export default PageLoader;