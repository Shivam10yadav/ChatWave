import React from 'react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequests } from "../lib/api";
import { BellIcon, ClockIcon, MessageSquareIcon, UserCheckIcon, Sparkles, Check } from "lucide-react";
import NoNotificationsFound from '../components/NoNotificationsFound';

const Notification = () => {
  const queryClient = useQueryClient();
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="min-h-screen bg-base-100 text-base-content p-4 sm:p-6 lg:p-8">
      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 right-0 w-[30%] h-[30%] rounded-full bg-primary blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl space-y-12">
        {/* Header */}
        <header className="border-b border-base-content/10 pb-8">
          <div className="flex items-center gap-3 mb-2">
             <BellIcon className="size-5 text-primary" />
             <span className="text-xs font-black uppercase tracking-[0.2em] opacity-50">Activity Feed</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase italic">
            Notifications
          </h1>
        </header>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <span className="loading loading-infinity loading-lg text-primary"></span>
            <span className="text-xs font-bold uppercase tracking-widest opacity-40">Syncing Signals...</span>
          </div>
        ) : (
          <div className="space-y-16">
            {/* INCOMING REQUESTS */}
            {incomingRequests.length > 0 && (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-black flex items-center gap-3 tracking-tight">
                        <UserCheckIcon className="size-6 text-primary" />
                        Pending Requests
                    </h2>
                    <span className="badge badge-primary font-black px-4">{incomingRequests.length}</span>
                </div>

                <div className="grid gap-4">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="group bg-base-200/50 backdrop-blur-sm border border-base-content/5 rounded-[2rem] p-4 sm:p-6 hover:border-primary/40 transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="avatar">
                            <div className="size-16 rounded-2xl ring-2 ring-primary/20 ring-offset-2 ring-offset-base-200">
                              <img src={request.sender.profilePic} alt={request.sender.fullName} />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-black text-lg tracking-tight">{request.sender.fullName}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                                Native: {request.sender.nativeLanguage}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-wider opacity-40">
                                Learning: {request.sender.learningLanguage}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          className="btn btn-primary btn-md sm:btn-wide rounded-xl font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20"
                          onClick={() => acceptRequestMutation(request._id)}
                          disabled={isPending}
                        >
                          {isPending ? <span className="loading loading-spinner loading-xs" /> : "Confirm Connection"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ACCEPTED NOTIFICATIONS */}
            {acceptedRequests.length > 0 && (
              <section className="animate-in fade-in slide-in-from-bottom-4 delay-150 duration-500">
                <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="size-6 text-secondary" />
                    <h2 className="text-xl font-black tracking-tight">Recent Connections</h2>
                </div>

                <div className="grid gap-3">
                  {acceptedRequests.map((notification) => (
                    <div 
                        key={notification._id} 
                        className="relative overflow-hidden bg-base-200/30 border border-base-content/5 rounded-2xl p-4 transition-all hover:bg-base-200/60"
                    >
                      <div className="flex items-center gap-4">
                        <div className="avatar size-12">
                          <div className="rounded-xl grayscale group-hover:grayscale-0 transition-all">
                            <img src={notification.recipient.profilePic} alt={notification.recipient.fullName} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            <span className="font-black text-primary">{notification.recipient.fullName}</span>
                            <span className="opacity-70"> is now a partner.</span>
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-[10px] flex items-center font-bold opacity-40 uppercase tracking-tighter">
                                <ClockIcon className="size-3 mr-1" /> Just now
                            </span>
                          </div>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-success/10 text-success rounded-full border border-success/20 text-[10px] font-black uppercase tracking-widest">
                            <Check className="size-3" /> Linked
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {incomingRequests.length === 0 && acceptedRequests.length === 0 && (
              <div className="py-20">
                <NoNotificationsFound />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;