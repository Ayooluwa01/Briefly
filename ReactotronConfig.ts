import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
// import { queryClient } from "./your-query-client-file"; // Import your TanStack Query client

const hostUri = Constants.expoConfig?.hostUri;

const tron = Reactotron.setAsyncStorageHandler!(AsyncStorage)
  .configure({
    name: "Briefly",
    host: "10.210.251.198",
  })
  .useReactNative({
    asyncStorage: true,
    networking: {
      ignoreUrls: /symbolicate|logs|generate_204/, // Don't log Expo's internal noise
    },
  })
  .connect();

// Extend the console to include Reactotron
declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}
console.tron = Reactotron;

export default tron;
