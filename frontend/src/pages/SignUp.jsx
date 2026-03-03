import React, { useState } from "react";
import { Pentagon, Mail, Lock, User, ShieldCheck, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signUp } from "../lib/api";

const SignUp = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: signUp,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  const handleSignup = (e) => {
    e.preventDefault();
    mutate(signupData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-base-100 selection:bg-primary selection:text-primary-content">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] size-[500px] bg-secondary/10 blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row bg-base-200/50 backdrop-blur-2xl rounded-[3rem] border border-base-content/5 shadow-2xl overflow-hidden">
        
        {/* LEFT SECTION: AUTH INTERFACE */}
        <div className="w-full lg:w-[45%] p-8 sm:p-12 lg:p-16 flex flex-col justify-between border-r border-base-content/5">
          <div>
            {/* BRANDING */}
            <div className="flex items-center gap-3 mb-10">
              <div className="relative">
                <Pentagon className="size-10 text-primary fill-primary/10 animate-[spin_20s_linear_infinite]" />
                <div className="absolute inset-0 bg-primary blur-xl opacity-20" />
              </div>
              <span className="text-3xl font-black lowercase tracking-tighter italic">
                nexus<span className="text-primary">.</span>
              </span>
            </div>

            {/* HEADER */}
            <div className="mb-8 space-y-2">
              <h1 className="text-4xl font-black tracking-tighter uppercase italic">Create Identity</h1>
              <p className="text-[10px] font-mono font-bold uppercase tracking-[0.4em] opacity-40">
                Registering New Linguistic Node...
              </p>
            </div>

            {/* ERROR DISPLAY */}
            {error && (
              <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-2xl flex items-center gap-3 text-error animate-in slide-in-from-top-2">
                <div className="size-2 rounded-full bg-error animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider">
                    {error?.response?.data?.message || "Registration Failed"}
                </span>
              </div>
            )}

            {/* FORM */}
            <form onSubmit={handleSignup} className="space-y-5">
              <div className="space-y-4">
                {/* FULL NAME */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 px-1">Legal Identity</label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-30 group-focus-within:text-primary transition-colors" />
                    <input
                      type="text"
                      placeholder="JOHN DOE"
                      className="input input-lg w-full bg-base-100 border-base-content/5 pl-12 rounded-2xl text-sm font-bold tracking-tight focus:outline-none focus:border-primary/50 transition-all"
                      value={signupData.fullName}
                      onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 px-1">Comm Channel (Email)</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-30 group-focus-within:text-primary transition-colors" />
                    <input
                      type="email"
                      placeholder="USER@NETWORK.COM"
                      className="input input-lg w-full bg-base-100 border-base-content/5 pl-12 rounded-2xl text-sm font-bold tracking-tight focus:outline-none focus:border-primary/50 transition-all"
                      value={signupData.email}
                      onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 px-1">Access Key</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-30 group-focus-within:text-primary transition-colors" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="input input-lg w-full bg-base-100 border-base-content/5 pl-12 rounded-2xl text-sm font-bold tracking-tight focus:outline-none focus:border-primary/50 transition-all"
                      value={signupData.password}
                      onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                      required
                    />
                  </div>
                  <p className="text-[9px] font-mono opacity-30 uppercase px-1">Min. 6 alphanumeric characters required</p>
                </div>
              </div>

              {/* TERMS */}
              <label className="flex items-start gap-3 cursor-pointer group px-1">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-xs mt-0.5 rounded-md" required />
                <span className="text-[10px] font-medium leading-tight opacity-40 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                  I accept the <span className="text-primary underline">protocols</span> and <span className="text-primary underline">privacy encryption</span>.
                </span>
              </label>

              <button 
                type="submit" 
                className="btn btn-primary btn-block btn-lg rounded-2xl font-black uppercase tracking-[0.4em] text-xs shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all" 
                disabled={isPending}
              >
                {isPending ? (
                  <span className="loading loading-ring loading-md"></span>
                ) : (
                  <div className="flex items-center gap-2">
                    Initialize Identity <ChevronRight className="size-4" />
                  </div>
                )}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center lg:text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
              Already Registered?{" "}
              <Link to="/login" className="text-primary hover:tracking-[0.4em] transition-all">
                Sync Existing Node
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT SECTION: SYSTEM VISUALS */}
        <div className="hidden lg:flex w-[55%] bg-base-300/30 relative items-center justify-center p-12">
          {/* DECORATIVE GRID */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(var(--bc) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          
          <div className="relative z-10 w-full max-w-md text-center space-y-8">
             <div className="relative inline-block group">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150 animate-pulse" />
                <img src="/Sign up-bro.png" alt="Hero" className="relative w-full h-auto grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
             </div>

             <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                   <ShieldCheck className="size-5 text-primary" />
                   <h2 className="text-2xl font-black tracking-tighter uppercase italic">Neural Uplink</h2>
                </div>
                <p className="text-sm font-medium leading-relaxed opacity-40 uppercase tracking-widest">
                   Joining the Nexus network unlocks global communication nodes. Decentralized learning starts here.
                </p>
             </div>

             <div className="flex justify-center gap-4 pt-4">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`size-1 rounded-full bg-primary ${i % 2 === 0 ? 'animate-bounce' : 'animate-pulse'}`} />
                ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;