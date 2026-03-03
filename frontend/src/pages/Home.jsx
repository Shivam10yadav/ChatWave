import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from '../lib/api';
import { Link } from "react-router";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon, Sparkles, Globe, Zap } from "lucide-react";
import NoFriendsFound from '../components/NoFriendsFound';
import FriendCard from '../components/FriendCard';
import { capitialize } from '../lib/utils';

const Home = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  
  const { data: friends = [], isLoading: loadingFriends } = useQuery({ queryKey: ["friends"], queryFn: getUserFriends });
  const { data: recomendedUsers = [], isLoading: loadingUsers } = useQuery({ queryKey: ["users"], queryFn: getRecommendedUsers });
  const { data: outgoingFriendReqs } = useQuery({ queryKey: ["outgoingFriendReqs"], queryFn: getOutgoingFriendReqs });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
  });

  useEffect(() => {
    const outgoingIds = new Set();
    outgoingFriendReqs?.forEach((req) => outgoingIds.add(req.recipient._id));
    setOutgoingRequestsIds(outgoingIds);
  }, [outgoingFriendReqs]);

  return (
    <div className="min-h-screen bg-base-100 p-4 sm:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* HEADER: NEUMORPHIC MINIMALISM */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-mono text-xs tracking-[0.4em] uppercase">
              <Zap className="size-3 fill-current" />
              Status: Connected
            </div>
            <h1 className="text-6xl font-black tracking-tighter lowercase select-none">
              nexus<span className="text-primary">.</span>
            </h1>
          </div>
          <Link to="/notifications" className="group flex items-center gap-4 bg-base-content text-base-100 px-6 py-3 rounded-full font-bold hover:pr-8 transition-all duration-300">
            <span className="text-sm uppercase tracking-widest">Incoming</span>
            <div className="size-6 rounded-full bg-primary flex items-center justify-center text-primary-content text-xs">
              {outgoingFriendReqs?.length || 0}
            </div>
          </Link>
        </header>

        {/* FRIENDS: THE HORIZON LINE */}
        <section>
          <div className="flex items-center gap-6 mb-12">
            <h2 className="text-2xl font-bold tracking-tight">Active Partners</h2>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-base-content/20 to-transparent" />
          </div>

          {loadingFriends ? (
            <div className="flex gap-4 overflow-hidden"><div className="h-40 w-full bg-base-200 animate-pulse rounded-3xl" /></div>
          ) : friends.length === 0 ? (
            <NoFriendsFound />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {friends.map((friend) => (
                <div key={friend._id} className="grayscale hover:grayscale-0 transition-all duration-500">
                  <FriendCard friend={friend} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* RECOMMENDATIONS: THE MESH GRID */}
        <section className="space-y-12">
          <div className="max-w-md space-y-4">
            <h2 className="text-4xl font-black tracking-tighter italic uppercase text-primary">Discover</h2>
            <p className="text-sm opacity-50 font-medium leading-relaxed">
              Proprietary matching based on linguistic compatibility and geographical proximity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-base-content/10">
            {recomendedUsers.map((user) => {
              const hasSent = outgoingRequestsIds.has(user._id);
              return (
                <div key={user._id} className="p-8 border-r border-b border-base-content/10 hover:bg-primary/5 transition-colors group">
                  <div className="flex flex-col gap-8">
                    <div className="flex justify-between items-start">
                      <div className="avatar">
                        <div className="w-16 h-16 rounded-full grayscale group-hover:grayscale-0 transition-all duration-700 ring-1 ring-base-content/20 ring-offset-4 ring-offset-base-100">
                          <img src={user.profilePic} alt={user.fullName} />
                        </div>
                      </div>
                      <Globe className="size-5 opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-bold tracking-tight uppercase">{user.fullName}</h3>
                      <p className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{user.location || "Location Private"}</p>
                    </div>

                    <div className="flex gap-2">
                       <div className="px-3 py-1 rounded-md bg-base-200 text-[10px] font-black uppercase">{user.nativeLanguage}</div>
                       <div className="px-3 py-1 rounded-md border border-base-content/10 text-[10px] font-black uppercase opacity-50">{user.learningLanguage}</div>
                    </div>

                    <button
                      onClick={() => sendRequestMutation(user._id)}
                      disabled={hasSent || isPending}
                      className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                        hasSent ? "opacity-30 cursor-not-allowed" : "bg-primary text-primary-content hover:tracking-[0.5em]"
                      }`}
                    >
                      {hasSent ? "Transmitted" : "Initiate Contact"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
export default Home;