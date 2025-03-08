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
import { useCurrentApp } from "@/context/app.context";
import { currencyFormatter } from "@/utils/api";
import React from "react";
import Popup from "./popup.home";
import { FONTS } from "@/theme/typography";

const { height: sHeight, width: sWidth } = Dimensions.get("window");

interface IProps {
  name: string;
  description: string;
  refAPI: string;
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: APP_COLOR.WHITE,
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
  const { cart, setCart, restaurant, setRestaurant } = useCurrentApp();

  const mockRestaurant = {
    _id: "mock_restaurant_1",
    name: "Số món đã đặt",
    menu: [],
  };

  useEffect(() => {
    if (!restaurant) {
      setRestaurant(mockRestaurant);
    }
  }, []);

  const mockRestaurants = [
    {
      _id: "1",
      name: "Pizza Margherita",
      price: 150000,
      image: "demo.jpg",
      description:
        "Một chiếc pizza truyền thống với sốt cà chua, phô mai mozzarella và lá húng quế tươi.",
    },
    {
      _id: "2",
      name: "Burger Classic",
      price: 80000,
      image: "demo.jpg",
      description:
        "Burger với thịt bò tươi ngon, phô mai cheddar, rau xà lách và sốt đặc biệt.",
    },
    {
      _id: "3",
      name: "Sushi Rolls",
      price: 120000,
      image: "demo.jpg",
      description:
        "Sushi cuộn tươi ngon với cá hồi, cơm, và rau cuốn bên ngoài.",
    },
    {
      _id: "4",
      name: "Pasta Carbonara",
      price: 130000,
      image: "demo.jpg",
      description:
        "Mì pasta với sốt carbonara mịn màng, được làm từ trứng, phô mai parmesan và thịt xông khói.",
    },
  ];

  const [restaurants, setRestaurants] = useState(mockRestaurants);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handlePressItem = (item: any) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };
  const handleQuantityChange = (item: any, action: "MINUS" | "PLUS") => {
    if (!restaurant?._id) return;

    const total = action === "MINUS" ? -1 : 1;
    const priceChange = total * item.price;

    const newCart = { ...cart };
    if (!newCart[restaurant._id]) {
      newCart[restaurant._id] = {
        sum: 0,
        quantity: 0,
        items: {},
      };
    }

    newCart[restaurant._id].sum =
      (newCart[restaurant._id].sum || 0) + priceChange;
    newCart[restaurant._id].quantity =
      (newCart[restaurant._id].quantity || 0) + total;

    if (!newCart[restaurant._id].items[item._id]) {
      newCart[restaurant._id].items[item._id] = {
        data: {
          ...item,
          basePrice: item.price,
          title: item.name,
        },
        quantity: 0,
      };
    }

    const currentQuantity =
      (newCart[restaurant._id].items[item._id].quantity || 0) + total;

    if (currentQuantity <= 0) {
      delete newCart[restaurant._id].items[item._id];
      if (Object.keys(newCart[restaurant._id].items).length === 0) {
        delete newCart[restaurant._id];
      }
    } else {
      newCart[restaurant._id].items[item._id] = {
        data: {
          ...item,
          basePrice: item.price,
          title: item.name,
        },
        quantity: currentQuantity,
      };
    }

    setCart(newCart);
  };

  const getItemQuantity = (itemId: string) => {
    if (!restaurant?._id) return 0;
    return cart[restaurant._id]?.items[itemId]?.quantity || 0;
  };

  const backend =
    Platform.OS === "android"
      ? process.env.EXPO_PUBLIC_ANDROID_API_URL
      : process.env.EXPO_PUBLIC_IOS_API_URL;

  const baseImage = `${backend}/images/restaurant`;

  return (
    <>
      <View style={{ height: 10, backgroundColor: APP_COLOR.YELLOW }}></View>
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
                fontWeight: "600",
                fontFamily: FONTS.medium,
                fontSize: 17,
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
              <Text
                style={{
                  color: "#5a5a5a",
                  fontFamily: FONTS.medium,
                  fontSize: 17,
                }}
              >
                Xem tất cả
              </Text>
              <MaterialIcons
                style={{ marginTop: 3 }}
                name="navigate-next"
                size={20}
                color="grey"
              />
            </Pressable>
          </View>

          <View style={{ marginVertical: 5 }}>
            <Text
              style={{
                color: "#5a5a5a",
                fontFamily: FONTS.medium,
                fontSize: 17,
              }}
            >
              {description}
            </Text>
          </View>

          <FlatList
            data={restaurants}
            horizontal
            contentContainerStyle={{ gap: 7 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              const quantity = getItemQuantity(item._id);
              return (
                <Pressable onPress={() => handlePressItem(item)}>
                  <View
                    style={{
                      backgroundColor: "#efefef",
                      borderRadius: 10,
                      marginTop: 10,
                    }}
                  >
                    <Image
                      style={{ height: 130, width: 130, borderRadius: 10 }}
                      source={require("@/assets/demo.jpg")}
                    />
                    <View style={{ padding: 5 }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                          fontWeight: "600",
                          maxWidth: 130,
                          fontFamily: FONTS.medium,
                          fontSize: 17,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          color: "#5a5a5a",
                          fontFamily: FONTS.medium,
                          fontSize: 17,
                        }}
                      >
                        {currencyFormatter(item.price)}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingBottom: 5,
                      }}
                    >
                      <Pressable
                        onPress={() => handleQuantityChange(item, "MINUS")}
                        style={({ pressed }) => ({
                          opacity: quantity > 0 ? (pressed ? 0.5 : 1) : 0.3,
                        })}
                        disabled={quantity === 0}
                      >
                        <AntDesign
                          name="minussquareo"
                          size={24}
                          color={
                            quantity > 0 ? APP_COLOR.ORANGE : APP_COLOR.GREY
                          }
                        />
                      </Pressable>

                      <Text style={{ minWidth: 25, textAlign: "center" }}>
                        {quantity}
                      </Text>

                      <Pressable
                        onPress={() => handleQuantityChange(item, "PLUS")}
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
                  <View style={{ marginBottom: 20 }}></View>
                </Pressable>
              );
            }}
          />
          <Popup
            visible={modalVisible}
            onClose={closeModal}
            item={selectedItem}
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
