import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, Pentagon, Zap } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-base-content/5 sticky top-0 z-40 h-20 flex items-center transition-all duration-300">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between w-full">
          
          {/* BRANDING - REVEALS ON CHAT PAGE OR MOBILE */}
          <div className={`flex items-center gap-4 transition-all duration-500 ${isChatPage ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"}`}>
            <div className="relative">
              <Pentagon className="size-8 text-primary fill-primary/5 animate-[spin_12s_linear_infinite]" />
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full" />
            </div>
            <span className="text-2xl font-black lowercase tracking-tighter italic">
              nexus<span className="text-primary">.</span>
            </span>
          </div>

          {/* RIGHT SIDE TOOLS */}
          <div className="flex items-center gap-2 sm:gap-6 ml-auto">
            
            {/* SYSTEM STATUS (DECORATIVE) */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-base-200/50 rounded-full border border-base-content/5">
              <Zap className="size-3 text-primary animate-pulse" />
              <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">System.Live</span>
            </div>

            <div className="flex items-center gap-1 border-r border-base-content/10 pr-4 sm:pr-6">
              <Link to={"/notifications"}>
                <button className="group btn btn-ghost btn-circle hover:bg-transparent">
                  <BellIcon className="h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </button>
              </Link>
              
              <ThemeSelector />
            </div>

            {/* USER PROFILE & LOGOUT */}
            <div className="flex items-center gap-4 pl-2">
              <div className="flex flex-col items-end hidden sm:block">
                <p className="text-[10px] font-black uppercase tracking-widest">{authUser?.fullName?.split(' ')[0]}</p>
                <p className="text-[8px] font-mono opacity-40 uppercase tracking-tighter">Verified User</p>
              </div>
              
              <div className="avatar">
                <div className="w-10 rounded-xl ring-1 ring-base-content/10 ring-offset-2 ring-offset-base-100 group cursor-pointer overflow-hidden">
                  <img src={authUser?.profilePic} alt="Avatar" className="grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
              </div>

              <button 
                className="group btn btn-ghost btn-circle hover:bg-error/10" 
                onClick={logoutMutation}
                title="Disconnect"
              >
                <LogOutIcon className="h-5 w-5 opacity-40 group-hover:opacity-100 group-hover:text-error transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;