import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { MessageSquareIcon, Zap, Globe } from "lucide-react";
import { capitialize } from "../lib/utils";

const FriendCard = ({ friend }) => {
  return (
    <div className="group relative bg-base-200/40 backdrop-blur-md border border-base-content/5 rounded-[2.5rem] p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden">
      
      {/* DECORATIVE AMBIENT GLOW */}
      <div className="absolute -top-10 -right-10 size-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />

      <div className="relative z-10 space-y-6">
        {/* HEADER: AVATAR & STATUS */}
        <div className="flex items-start justify-between">
          <div className="relative">
            <div className="avatar">
              <div className="size-20 rounded-3xl ring-2 ring-base-100 ring-offset-4 ring-offset-base-200 shadow-xl grayscale group-hover:grayscale-0 transition-all duration-700">
                <img src={friend.profilePic} alt={friend.fullName} className="object-cover" />
              </div>
            </div>
            {/* ONLINE INDICATOR */}
            <span className="absolute -bottom-1 -right-1 size-5 bg-base-100 rounded-full flex items-center justify-center">
                <span className="size-2.5 rounded-full bg-success animate-pulse" />
            </span>
          </div>
          
          <div className="flex flex-col items-end gap-1">
             <Zap className="size-4 text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
             <span className="text-[8px] font-black uppercase tracking-widest opacity-30">Node_Active</span>
          </div>
        </div>

        {/* USER IDENTITY */}
        <div className="space-y-1">
          <h3 className="text-xl font-black tracking-tighter uppercase italic truncate">
            {friend.fullName}
          </h3>
          <div className="flex items-center gap-2 text-[10px] font-mono opacity-40 uppercase tracking-tighter">
            <Globe className="size-3" />
            <span>Frequency: Linked</span>
          </div>
        </div>

        {/* LANGUAGE DATA NODES */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between p-2 bg-base-content/5 rounded-xl border border-base-content/5">
            <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Native</span>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase">{friend.nativeLanguage}</span>
                {getLanguageFlag(friend.nativeLanguage)}
            </div>
          </div>
          
          <div className="flex items-center justify-between p-2 bg-primary/5 rounded-xl border border-primary/10">
            <span className="text-[9px] font-black uppercase tracking-widest text-primary">Learning</span>
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase">{friend.learningLanguage}</span>
                {getLanguageFlag(friend.learningLanguage)}
            </div>
          </div>
        </div>

        {/* ACTION: UPLINK */}
        <Link 
          to={`/chat/${friend._id}`} 
          className="btn btn-primary btn-block rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-lg shadow-primary/10 group-hover:shadow-primary/30 transition-all duration-300"
        >
          <MessageSquareIcon className="size-4 mr-2" />
          Open Channel
        </Link>
      </div>

      {/* TECHNICAL ACCENT */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-base-content/5 group-hover:bg-primary/20 transition-colors" />
    </div>
  );
};

export default FriendCard;

export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <div className="size-5 rounded-md overflow-hidden ring-1 ring-base-content/10">
        <img
          src={`https://flagcdn.com/w40/${countryCode}.png`}
          alt={`${langLower} flag`}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }
  return null;
}