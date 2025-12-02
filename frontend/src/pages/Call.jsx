import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";

import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import toast from "react-hot-toast";
import PageLoader from "../components/PageLoader";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const Call = () => {
  const { id: callId } = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);

  const { authUser, isLoading } = useAuthUser();

  console.log("=== CALL COMPONENT DEBUG ===");
  console.log("1. callId:", callId);
  console.log("2. authUser:", authUser);
  console.log("3. isLoading:", isLoading);
  console.log("4. STREAM_API_KEY:", STREAM_API_KEY);

  const { data: tokenData, isLoading: tokenLoading, error: tokenError } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  console.log("5. tokenData:", tokenData);
  console.log("6. tokenLoading:", tokenLoading);
  console.log("7. tokenError:", tokenError);

  useEffect(() => {
    console.log("=== INIT CALL EFFECT ===");
    
    const initCall = async () => {
      console.log("8. Checking prerequisites...");
      console.log("   - tokenData:", tokenData);
      console.log("   - tokenData.token:", tokenData?.token);
      console.log("   - authUser:", authUser);
      console.log("   - callId:", callId);

      if (!tokenData?.token || !authUser || !callId) {
        console.log("9. ❌ Missing required data, returning");
        setIsConnecting(false);
        return;
      }

      try {
        console.log("10. ✅ All data available, initializing Stream video client...");

        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.profilePic,
        };

        console.log("11. User object:", user);
        console.log("12. Creating StreamVideoClient...");

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token,
        });

        console.log("13. ✅ StreamVideoClient created");
        console.log("14. Creating call instance...");

        const callInstance = videoClient.call("default", callId);

        console.log("15. ✅ Call instance created, joining...");

        await callInstance.join({ create: true });

        console.log("16. ✅ Joined call successfully!");

        setClient(videoClient);
        setCall(callInstance);
      } catch (error) {
        console.error("17. ❌ Error joining call:", error);
        console.error("    Error details:", error.message);
        console.error("    Error stack:", error.stack);
        toast.error("Could not join the call. Please try again.");
      } finally {
        console.log("18. Setting isConnecting to false");
        setIsConnecting(false);
      }
    };

    initCall();
  }, [tokenData, authUser, callId]);

  console.log("19. Render state:");
  console.log("    - isLoading:", isLoading);
  console.log("    - isConnecting:", isConnecting);
  console.log("    - client:", client);
  console.log("    - call:", call);

  if (isLoading || isConnecting) {
    console.log("20. Showing PageLoader");
    return <PageLoader />;
  }

  console.log("21. Rendering main content");

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <>
            {console.log("22. ✅ Rendering StreamVideo components")}
            <StreamVideo client={client}>
              <StreamCall call={call}>
                <CallContent />
              </StreamCall>
            </StreamVideo>
          </>
        ) : (
          <>
            {console.log("23. ❌ No client or call, showing error message")}
            <div className="flex items-center justify-center h-full">
              <p>Could not initialize call. Please refresh or try again later.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CallContent = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const navigate = useNavigate();

  console.log("=== CALL CONTENT ===");
  console.log("24. callingState:", callingState);

  if (callingState === CallingState.LEFT) {
    console.log("25. User left call, navigating to home");
    return navigate("/");
  }

  console.log("26. Rendering call UI");

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  );
};

export default Call;