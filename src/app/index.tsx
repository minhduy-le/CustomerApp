import { Redirect, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getAccountAPI } from "@/utils/api";
import { useCurrentApp } from "@/context/app.context";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { APP_FONT } from "@/utils/constant";
SplashScreen.preventAutoHideAsync();

const RootPage = () => {
  const { setAppState } = useCurrentApp();
  const [state, setState] = useState<any>();

  const [loaded, error] = useFonts({
    [APP_FONT as any]: require("@/assets/font/Playfair-Italic-VariableFont_opsz,wdth,wght.ttf"),
  });

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
        } else {
          router.replace("/(auth)/welcome");
        }
      } catch (e) {
        setState(() => {
          throw new Error("Không thể kết tới API Backend...");
        });
      } finally {
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);
  if (true) {
    return <Redirect href={"/(employee)"} />;
  }
  return <></>;
};

export default RootPage;
