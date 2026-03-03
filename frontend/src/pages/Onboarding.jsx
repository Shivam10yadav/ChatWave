import React, { useState } from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { completeOnboarding } from '../lib/api';
import { LoaderIcon, MapPinIcon, Pentagon, ShuffleIcon, UserIcon, CameraIcon, Sparkles } from "lucide-react";
import { LANGUAGES } from '../constants';

const Onboarding = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();
  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: completeOnboarding,
    onSuccess: () => {
      toast.success("Identity Uploaded Successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Onboarding failed");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1;
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;
    setFormState({ ...formState, profilePic: randomAvatar });
    toast.success("New Avatar Synced");
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4 sm:p-10">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary blur-[120px] rounded-full opacity-50" />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <div className="bg-base-200/50 backdrop-blur-xl border border-base-content/5 rounded-[3rem] overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 h-full">
            
            {/* LEFT PANEL - VISUALS */}
            <div className="lg:col-span-2 bg-primary p-8 lg:p-12 flex flex-col justify-between text-primary-content">
              <div className="space-y-6">
                <Pentagon className="size-12 fill-primary-content/20 animate-[spin_10s_linear_infinite]" />
                <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                  User<br/>Initialization<span className="opacity-40">.</span>
                </h1>
                <p className="text-sm font-bold opacity-80 leading-relaxed uppercase tracking-wider">
                  Configure your node parameters to begin global synchronization.
                </p>
              </div>

              {/* AVATAR SELECTOR */}
              <div className="flex flex-col items-center gap-6 mt-12 lg:mt-0">
                <div className="relative group">
                  <div className="absolute inset-0 bg-base-100 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="relative size-40 rounded-3xl overflow-hidden border-4 border-primary-content/20 ring-4 ring-primary-content/5">
                    {formState.profilePic ? (
                      <img src={formState.profilePic} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="flex items-center justify-center h-full bg-primary-content/10">
                        <CameraIcon className="size-12 opacity-40" />
                      </div>
                    )}
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={handleRandomAvatar}
                  className="btn btn-ghost btn-sm text-[10px] font-black uppercase tracking-widest border border-primary-content/20 rounded-full hover:bg-primary-content hover:text-primary transition-all"
                >
                  <ShuffleIcon className="size-3 mr-2" />
                  Regenerate Avatar
                </button>
              </div>
            </div>

            {/* RIGHT PANEL - FORM */}
            <div className="lg:col-span-3 p-8 lg:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* IDENTITY FIELDS */}
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 px-1">Legal Name</label>
                    <input
                      type="text"
                      value={formState.fullName}
                      onChange={(e) => setFormState({ ...formState, fullName: e.target.value })}
                      className="input input-lg w-full bg-base-100 border-base-content/5 focus:border-primary focus:outline-none rounded-2xl font-bold tracking-tight text-sm"
                      placeholder="Identify yourself..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 px-1">Linguistic Bio</label>
                    <textarea
                      value={formState.bio}
                      onChange={(e) => setFormState({ ...formState, bio: e.target.value })}
                      className="textarea textarea-lg w-full bg-base-100 border-base-content/5 focus:border-primary focus:outline-none rounded-2xl font-medium text-sm min-h-[100px]"
                      placeholder="Briefly state your objectives..."
                    />
                  </div>
                </div>

                {/* PARAMETERS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 px-1">Native Node</label>
                    <select
                      value={formState.nativeLanguage}
                      onChange={(e) => setFormState({ ...formState, nativeLanguage: e.target.value })}
                      className="select select-lg w-full bg-base-100 border-base-content/5 rounded-2xl text-xs font-bold"
                    >
                      <option value="">Origin Language</option>
                      {LANGUAGES.map((lang) => (
                        <option key={`native-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 px-1">Target Node</label>
                    <select
                      value={formState.learningLanguage}
                      onChange={(e) => setFormState({ ...formState, learningLanguage: e.target.value })}
                      className="select select-lg w-full bg-base-100 border-base-content/5 rounded-2xl text-xs font-bold"
                    >
                      <option value="">Acquisition Language</option>
                      {LANGUAGES.map((lang) => (
                        <option key={`learning-${lang}`} value={lang.toLowerCase()}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 px-1">Geo-Location</label>
                  <div className="relative">
                    <MapPinIcon className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-primary opacity-50" />
                    <input
                      type="text"
                      value={formState.location}
                      onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                      className="input input-lg w-full bg-base-100 border-base-content/5 pl-12 rounded-2xl text-sm font-bold"
                      placeholder="City, Sector..."
                    />
                  </div>
                </div>

                {/* SUBMIT */}
                <button 
                  className="btn btn-primary btn-block btn-lg rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs shadow-xl shadow-primary/20"
                  disabled={isPending}
                  type="submit"
                >
                  {isPending ? (
                    <LoaderIcon className="animate-spin size-5" />
                  ) : (
                    <>
                      <Sparkles className="size-4 mr-2" />
                      Initialize Profile
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Footer info */}
        <p className="text-center mt-8 text-[9px] font-mono opacity-20 uppercase tracking-[0.5em]">
          End-to-End Encryption Protocol v3.12
        </p>
      </div>
    </div>
  );
};

export default Onboarding;