import React, { useState } from 'react';
import { Pentagon, Mail, Lock, ChevronRight, Zap, Globe } from "lucide-react";
import { Link } from "react-router";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isPending, error, loginMutation } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-base-100 selection:bg-primary selection:text-primary-content">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] size-[500px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] size-[500px] bg-secondary/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row bg-base-200/50 backdrop-blur-2xl rounded-[3rem] border border-base-content/5 shadow-2xl overflow-hidden">
        
        {/* LEFT SECTION: AUTH INTERFACE */}
        <div className="w-full lg:w-[45%] p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-r border-base-content/5">
          <div>
            {/* BRANDING */}
            <div className="flex items-center gap-3 mb-12">
              <div className="relative">
                <Pentagon className="size-10 text-primary fill-primary/10 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-0 bg-primary blur-xl opacity-20" />
              </div>
              <span className="text-3xl font-black lowercase tracking-tighter italic">
                nexus<span className="text-primary">.</span>
              </span>
            </div>

            {/* HEADER */}
            <div className="mb-10 space-y-2">
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">Access Terminal</h1>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">
                Initializing Secure Auth Protocol...
              </p>
            </div>

            {/* ERROR DISPLAY */}
            {error && (
              <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-2xl flex items-center gap-3 text-error animate-in slide-in-from-top-2">
                <div className="size-2 rounded-full bg-error animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">{error.response?.data?.message || "Auth Error"}</span>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 px-1">Network Identity</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-30 group-focus-within:text-primary transition-colors" />
                    <input
                      type="email"
                      placeholder="USER@NETWORK.COM"
                      className="input input-lg w-full bg-base-100 border-base-content/5 pl-12 rounded-2xl text-sm font-bold tracking-tight focus:outline-none focus:border-primary/50 transition-all"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between px-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Access Key</label>
                    <Link to="#" className="text-[9px] font-black uppercase tracking-widest text-primary opacity-60 hover:opacity-100 transition-opacity">Reset Key?</Link>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-30 group-focus-within:text-primary transition-colors" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-lg w-full bg-base-100 border-base-content/5 pl-12 rounded-2xl text-sm font-bold tracking-tight focus:outline-none focus:border-primary/50 transition-all"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-block btn-lg rounded-2xl font-black uppercase tracking-[0.4em] text-xs shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all" 
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-ring loading-md"></span>
                ) : (
                  <div className="flex items-center gap-2">
                    Establish Link <ChevronRight className="size-4" />
                  </div>
                )}
              </button>
            </form>
          </div>

          <div className="mt-12 text-center lg:text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
              New Node?{" "}
              <Link to="/signup" className="text-primary hover:tracking-[0.4em] transition-all">
                Create Identity
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT SECTION: SYSTEM VISUALS */}
        <div className="hidden lg:flex w-[55%] bg-base-300/30 relative items-center justify-center p-12">
          {/* DECORATIVE GRID */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--bc) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          <div className="relative z-10 w-full max-w-md text-center space-y-8">
             <div className="relative inline-block">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
                <img src="/Login-pana.png" alt="Hero" className="relative w-full h-auto grayscale opacity-80 group-hover:grayscale-0 transition-all duration-700" />
             </div>

             <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                   <Globe className="size-5 text-primary" />
                   <h2 className="text-2xl font-black tracking-tighter uppercase italic">Global Sync</h2>
                </div>
                <p className="text-sm font-medium leading-relaxed opacity-40 uppercase tracking-widest">
                   Connecting linguistic nodes across the digital horizon. Practice. Learn. Evolve.
                </p>
             </div>

             <div className="flex justify-center gap-8 pt-8">
                {[1,2,3].map(i => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="size-1 rounded-full bg-primary animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    <div className="h-12 w-[1px] bg-gradient-to-b from-primary/50 to-transparent" />
                  </div>
                ))}
             </div>
          </div>

          {/* SYSTEM TAG */}
          <div className="absolute bottom-10 right-10 flex items-center gap-2 px-4 py-2 border border-base-content/5 rounded-full bg-base-100/50 backdrop-blur-md">
             <Zap className="size-3 text-primary" />
             <span className="text-[8px] font-mono font-bold uppercase tracking-widest opacity-50 text-base-content">Status: Ready for Uplink</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;