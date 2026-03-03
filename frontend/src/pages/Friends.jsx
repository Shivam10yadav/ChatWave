import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getUserFriends } from '../lib/api';
import FriendCard from '../components/FriendCard';
import NoFriendsFound from '../components/NoFriendsFound';
import { UsersIcon, Activity, Search } from "lucide-react";

const Friends = () => {
  const { data: friends = [], isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  return (
    <div className="min-h-screen bg-base-100 p-4 sm:p-10">
      {/* BACKGROUND ACCENT */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
        <div className="absolute top-[20%] left-[10%] w-[30%] h-[30%] rounded-full bg-primary blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-base-content/10 pb-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <UsersIcon className="size-5 text-primary" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Network Directory</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black tracking-tighter uppercase italic">
              Connections<span className="text-primary">.</span>
            </h1>
            
            <p className="text-sm font-medium opacity-50 max-w-md leading-relaxed">
              Managed encrypted links with your global language partners. 
              Active synchronization in progress.
            </p>
          </div>

          {/* STATUS COUNTER BENTO BOX */}
          {!isLoading && friends.length > 0 && (
            <div className="flex items-center gap-6 bg-base-200/50 backdrop-blur-sm border border-base-content/5 p-4 rounded-[2rem] px-8">
              <div className="flex flex-col items-center">
                <span className="text-3xl font-black text-primary leading-none">{friends.length}</span>
                <span className="text-[8px] font-bold uppercase tracking-widest opacity-40 mt-1 text-center">Active<br/>Nodes</span>
              </div>
              <div className="w-[1px] h-10 bg-base-content/10" />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <Activity className="size-3 text-success animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">System Online</span>
                </div>
                <p className="text-[9px] opacity-40 font-mono mt-1">Uplink: Stable</p>
              </div>
            </div>
          )}
        </header>

        {/* SEARCH BAR (Visual Decoration to match the vibe) */}
        {!isLoading && friends.length > 0 && (
          <div className="relative max-w-md group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 opacity-30 group-focus-within:text-primary group-focus-within:opacity-100 transition-all" />
            <input 
              type="text" 
              placeholder="Filter Nodes..." 
              className="w-full bg-base-200/30 border border-base-content/5 rounded-2xl py-4 pl-12 pr-4 text-[10px] font-black uppercase tracking-[0.2em] focus:outline-none focus:border-primary/50 transition-all placeholder:opacity-20"
            />
          </div>
        )}

        {/* CONTENT GRID */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="relative">
               <span className="loading loading-ring loading-lg text-primary size-20" />
               <UsersIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-6 opacity-20" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-30 animate-pulse">Scanning Frequencies</span>
          </div>
        ) : friends.length === 0 ? (
          <div className="py-10">
            <NoFriendsFound />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {friends.map((friend) => (
              <div key={friend._id} className="hover:-translate-y-1 transition-transform duration-300">
                 <FriendCard friend={friend} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER STATS */}
      {!isLoading && friends.length > 0 && (
        <div className="mt-20 border-t border-base-content/5 pt-8 flex justify-between items-center opacity-20 text-[8px] font-mono uppercase tracking-[0.3em]">
           <span>Encrypted TLS connection active</span>
           <span>End-of-Directory</span>
        </div>
      )}
    </div>
  );
};

export default Friends;