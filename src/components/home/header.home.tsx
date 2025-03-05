import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import * as Location from "expo-location";
import { APP_COLOR } from "@/utils/constant";

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    gap: 3,
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
      <Text style={{ paddingLeft: 5 }}>Giao đến:</Text>
      <View style={styles.location}>
        <Entypo name="location-pin" size={20} color={APP_COLOR.ORANGE} />
        <Text>{location ? location : "Đang lấy vị trí..."}</Text>
      </View>
    </View>
  );
};

export default HeaderHome;
