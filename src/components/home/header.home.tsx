import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as Location from "expo-location";
import { APP_COLOR, APP_FONT } from "@/utils/constant";
import logo from "@/assets/logo.png";
import { FONTS } from "@/theme/typography";
const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    gap: 3,
    height: 50,
  },
  location: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

const HeaderHome = () => {
  const [location, setLocation] = useState<string | null>(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const locationData = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = locationData.coords;

        const address = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (address.length > 0) {
          const { city, region } = address[0];
          const fullAddress = `${city ? city : ""}, ${region ? region : ""}`;
          setLocation(fullAddress);
        } else {
          setLocation("Không tìm thấy địa chỉ");
        }
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.location}>
        <Text
          style={{
            paddingLeft: 5,
            position: "absolute",
            top: 10,
            left: 10,
            fontFamily: FONTS.medium,
            fontSize: 17,
          }}
        >
          Giao đến:
        </Text>
        <Entypo
          name="location-pin"
          size={20}
          color={APP_COLOR.ORANGE}
          style={{
            marginLeft: 10,
            position: "absolute",
            top: 10,
            left: 70,
          }}
        />
        <Text
          style={{
            position: "absolute",
            top: 10,
            left: 100,
            fontFamily: FONTS.medium,
            fontSize: 17,
          }}
        >
          {location ? location : "Đang lấy vị trí..."}
        </Text>

        <Image
          source={logo}
          style={{
            height: 70,
            width: 70,
            position: "absolute",
            right: 10,
            top: 10,
            transform: [{ translateY: -25 }],
          }}
        />
      </View>
    </View>
  );
};

export default HeaderHome;
