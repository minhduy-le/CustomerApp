import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  Pressable,
  Dimensions,
} from "react-native";
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import ContentLoader, { Rect } from "react-content-loader/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AntDesign from "@expo/vector-icons/AntDesign";

const { height: sHeight, width: sWidth } = Dimensions.get("window");

interface IProps {
  name: string;
  description: string;
  refAPI: string;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  sale: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: APP_COLOR.ORANGE,
    padding: 3,
    borderRadius: 3,
    alignSelf: "flex-start",
  },
});

const CollectionHome = (props: IProps) => {
  const { name, description, refAPI } = props;

  // Dữ liệu cứng cho các sản phẩm
  const mockRestaurants = [
    {
      _id: "1",
      name: "Pizza Margherita",
      price: 150000,
      image: "demo.jpg",
    },
    {
      _id: "2",
      name: "Burger Classic",
      price: 80000,
      image: "demo.jpg",
    },
    {
      _id: "3",
      name: "Sushi Rolls",
      price: 120000,
      image: "demo.jpg",
    },
    {
      _id: "4",
      name: "Pasta Carbonara",
      price: 130000,
      image: "demo.jpg",
    },
  ];

  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [loading, setLoading] = useState<boolean>(false);

  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>(
    {}
  );

  const handleQuantityChange = (itemId: string, action: "MINUS" | "PLUS") => {
    setSelectedItems((prevState) => {
      const currentQuantity = prevState[itemId] || 0;
      const newQuantity =
        action === "PLUS"
          ? currentQuantity + 1
          : Math.max(currentQuantity - 1, 0);

      return {
        ...prevState,
        [itemId]: newQuantity,
      };
    });
  };

  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;

  const baseImage = `${backend}/images/restaurant`;

  return (
    <>
      <View style={{ height: 10, backgroundColor: "#e9e9e9" }}></View>
      {loading === false ? (
        <View style={styles.container}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: APP_COLOR.ORANGE,
                fontSize: 16,
                fontWeight: "600",
              }}
            >
              {name}
            </Text>
            <Pressable
              onPress={() => router.navigate("/(auth)/restaurants")}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "#5a5a5a" }}>Xem tất cả</Text>
              <MaterialIcons
                style={{ marginTop: 3 }}
                name="navigate-next"
                size={20}
                color="grey"
              />
            </Pressable>
          </View>

          <View style={{ marginVertical: 5 }}>
            <Text style={{ color: "#5a5a5a" }}>{description}</Text>
          </View>

          <FlatList
            data={restaurants}
            horizontal
            contentContainerStyle={{ gap: 5 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() =>
                    router.navigate({
                      pathname: "/product/[id]",
                      params: { id: item._id },
                    })
                  }
                >
                  <View
                    style={{ backgroundColor: "#efefef", borderRadius: 10 }}
                  >
                    <Image
                      style={{ height: 130, width: 130, borderRadius: 10 }}
                      source={require("@/assets/demo.jpg")}
                    />
                    <View style={{ padding: 5 }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ fontWeight: "600", maxWidth: 130 }}
                      >
                        {item.name}
                      </Text>
                      <Text style={{ color: "#5a5a5a", fontSize: 12 }}>
                        {item.price.toLocaleString()} VND
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {selectedItems[item._id] > 0 ? (
                        <Pressable
                          onPress={() =>
                            handleQuantityChange(item._id, "MINUS")
                          }
                          style={({ pressed }) => ({
                            opacity: pressed ? 0.5 : 1,
                          })}
                        >
                          <AntDesign
                            name="minussquareo"
                            size={24}
                            color={APP_COLOR.ORANGE}
                          />
                        </Pressable>
                      ) : (
                        <AntDesign
                          name="minussquareo"
                          size={24}
                          color={APP_COLOR.GREY}
                        />
                      )}

                      <Text style={{ minWidth: 25, textAlign: "center" }}>
                        {selectedItems[item._id] || 0}
                      </Text>

                      <Pressable
                        onPress={() => handleQuantityChange(item._id, "PLUS")}
                        style={({ pressed }) => ({
                          opacity: pressed ? 0.5 : 1,
                        })}
                      >
                        <AntDesign
                          name="plussquare"
                          size={24}
                          color={APP_COLOR.ORANGE}
                        />
                      </Pressable>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      ) : (
        <ContentLoader
          speed={2}
          width={sWidth}
          height={230}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
          style={{ width: "100%" }}
        >
          <Rect x="10" y="10" rx="5" ry="5" width={150} height="200" />
          <Rect x="170" y="10" rx="5" ry="5" width={150} height="200" />
          <Rect x="330" y="10" rx="5" ry="5" width={150} height="200" />
        </ContentLoader>
      )}
    </>
  );
};

export default CollectionHome;
