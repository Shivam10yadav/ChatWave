import React from "react";
import useAuthUser from "../hooks/useAuthUser";
import { Link, useLocation } from "react-router-dom";
import { 
  BellIcon, 
  HomeIcon, 
  Pentagon, 
  UsersIcon, 
  Zap, 
  ShieldCheck, 
  ChevronRight 
} from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", label: "Core", icon: HomeIcon },
    { path: "/friends", label: "Nodes", icon: UsersIcon },
    { path: "/notifications", label: "Signals", icon: BellIcon },
  ];

  return (
    <aside className="group/sidebar w-20 hover:w-64 transition-all duration-500 ease-in-out bg-base-100 border-r border-base-content/10 hidden lg:flex flex-col h-screen sticky top-0 z-50 overflow-hidden">
      
      {/* LOGO SECTION */}
      <div className="p-6 mb-10 flex items-center justify-center group-hover/sidebar:justify-start transition-all">
        <Link to="/" className="flex items-center gap-4">
          <div className="relative flex-shrink-0">
            <Pentagon className="size-8 text-primary animate-[spin_10s_linear_infinite] fill-primary/5" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover/sidebar:opacity-100 transition-opacity" />
          </div>
          <span className="text-xl font-black lowercase tracking-tighter opacity-0 group-hover/sidebar:opacity-100 transition-all duration-300 whitespace-nowrap">
            nexus<span className="text-primary">.</span>
          </span>
        </Link>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 space-y-6">
        {/* SECTION LABEL (Visible only on hover) */}
        <div className="px-4 mb-2 h-4 overflow-hidden">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-500">
            System
          </p>
        </div>

        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center h-12 rounded-full transition-all duration-300 relative group/item ${
                    isActive 
                      ? "text-primary bg-primary/5" 
                      : "text-base-content/40 hover:text-base-content hover:bg-base-200"
                  }`}
                >
                  {/* ICON CONTAINER */}
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center">
                    <item.icon className={`size-5 transition-transform duration-300 group-hover/item:scale-110 ${isActive ? "opacity-100" : "opacity-60"}`} />
                  </div>

                  {/* LABEL */}
                  <span className={`text-[10px] font-black uppercase tracking-[0.3em] whitespace-nowrap opacity-0 group-hover/sidebar:opacity-100 transition-all duration-300 ml-2`}>
                    {item.label}
                  </span>

                  {/* ACTIVE INDICATOR */}
                  {isActive && (
                    <div className="absolute right-4 size-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--p),0.8)] opacity-0 group-hover/sidebar:opacity-100 transition-opacity" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* USER PROFILE SECTION */}
      <div className="p-4 mt-auto border-t border-base-content/5">
        <div className="flex items-center gap-4 bg-base-200/40 p-2 rounded-full group-hover/sidebar:rounded-2xl transition-all duration-500">
          <div className="relative flex-shrink-0">
            <div className="avatar">
              <div className="size-10 rounded-full border border-base-content/10 group-hover/sidebar:border-primary/50 transition-colors">
                <img 
                  src={authUser?.profilePic} 
                  alt="User" 
                  className="grayscale group-hover/sidebar:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 size-2.5 bg-success rounded-full border-2 border-base-100" />
          </div>

          <div className="flex-1 min-w-0 opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 overflow-hidden">
            <p className="font-black text-[11px] tracking-tight truncate uppercase italic">
              {authUser?.fullName}
            </p>
            <div className="flex items-center gap-1 opacity-50">
              <ShieldCheck className="size-3 text-primary" />
              <span className="text-[9px] font-bold uppercase tracking-widest">Operator</span>
            </div>
          </div>

          <div className="hidden group-hover/sidebar:block pr-2">
            <ChevronRight className="size-4 opacity-20" />
          </div>
        </div>

        {/* CONNECTION STATUS */}
        <div className="mt-4 flex items-center justify-center group-hover/sidebar:justify-start group-hover/sidebar:px-4 gap-2 opacity-30 group-hover/sidebar:opacity-60">
           <Zap className="size-3 fill-current text-primary" />
           <span className="text-[8px] font-mono uppercase tracking-[0.2em] hidden group-hover/sidebar:inline">
             Uplink: Active
           </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;