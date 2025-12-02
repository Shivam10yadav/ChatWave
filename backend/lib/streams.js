import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk"; // Add this import
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("Stream API key or Secret is missing");
}

// For chat
const streamChatClient = StreamChat.getInstance(apiKey, apiSecret);

// For video calls
const streamVideoClient = new StreamClient(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await streamChatClient.upsertUsers([userData]);
    return userData;
  } catch (error) {
    console.error("Error upserting Stream user:", error);
  }
};

export const generateStreamToken = (userId) => {
  try {
    const userIdStr = userId.toString();
    
    // Generate token for BOTH chat and video
    return streamVideoClient.createToken(userIdStr);
  } catch (error) {
    console.error("Error generating Stream token:", error);
    throw error;
  }
};