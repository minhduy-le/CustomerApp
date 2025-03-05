import { router } from "expo-router";
import { useEffect, useState } from "react";
import { getAccountAPI } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync();

const RootPage = () => {
  const { setAppState } = useCurrentApp();
  const [state, setState] = useState<any>();
  useEffect(() => {
    async function prepare() {
      try {
        const res = await getAccountAPI();

        if (res.data) {
          setAppState({
            user: res.data.user,
            access_token: await AsyncStorage.getItem("access_token"),
          });
          router.replace("/(tabs)");
          await AsyncStorage.removeItem("access_token");
        } else {
          router.replace("/(auth)/welcome");
        }
      } catch (e) {
        console.warn(e);
        setState(() => {
          throw new Error("Không thể kết tới API Backend...");
        });
      } finally {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, []);
  // if (true) {
  //     return (
  //         <Redirect href={"/(tabs)"} />
  //     )
  // }

  return <></>;
};

export default RootPage;
