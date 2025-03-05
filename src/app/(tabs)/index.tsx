import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import CollectionHome from "@/components/home/collection.home";
import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import ItemQuantity from "@/components/example/restaurant/order/item.quantity";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_COLOR } from "@/utils/constant";
import { currencyFormatter } from "@/utils/api";

const data = [
  {
    key: 1,
    name: "Top Quán Rating 5* tuần này",
    description: "Gợi ý quán được tín đồ ẩm thực đánh giá 5*",
    refAPI: "top-rating",
  },
  {
    key: 2,
    name: "Quán Mới Lên Sàn",
    description: "Khám phá ngay hàng loạt quán mới cực ngon",
    refAPI: "newcomer",
  },
  {
    key: 3,
    name: "Ăn Thỏa Thích, Freeship 0Đ",
    description: "Bánh ngọt, chân gà, bánh tráng trộn... Freeship.",
    refAPI: "top-freeship",
  },
];

const HomeTab = () => {
  const [mounted, setMounted] = useState(false);
  const { restaurant, cart } = useCurrentApp();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    setTimeout(() => {
      router.push("/(auth)/popup.sale");
    }, 1000);
  }, [mounted]);

  const handlePressItem = (item: IMenuItem, action: "MINUS" | "PLUS") => {
    if (item.options.length) {
      router.navigate({
        pathname:
          action === "PLUS"
            ? "/(user)/product/create.modal"
            : "/(user)/product/update.modal",
        params: { menuItemId: item._id },
      });
    }
  };

  const totalPrice = restaurant?._id ? cart[restaurant._id]?.sum || 0 : 0;
  const totalQuantity = restaurant?._id
    ? cart[restaurant._id]?.quantity || 0
    : 0;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomFlatList
        data={data}
        style={styles.list}
        renderItem={({ item }) => (
          <CollectionHome
            name={item.name}
            description={item.description}
            refAPI={item.refAPI}
          />
        )}
        HeaderComponent={<HeaderHome />}
        StickyElementComponent={<SearchHome />}
        TopListElementComponent={<TopListHome />}
      />
      {restaurant &&
        restaurant.menu.length > 0 &&
        restaurant.menu[0].menuItem.length > 0 && (
          <ItemQuantity
            restaurant={restaurant}
            menuItem={restaurant.menu[0].menuItem[0]}
            isModal={false}
          />
        )}
      {totalQuantity > 0 && (
        <View style={styles.orderContainer}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderText}>
              Tổng cộng ({totalQuantity} món)
            </Text>
            <Text style={styles.orderPrice}>
              {currencyFormatter(totalPrice)}
            </Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.orderButton,
              pressed && styles.orderButtonPressed,
            ]}
            onPress={() => router.push("/(user)/product/place.order")}
          >
            <Text style={styles.orderButtonText}>
              Đặt đơn - {currencyFormatter(totalPrice)}
            </Text>
          </Pressable>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ecf0f1",
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  header: {
    borderColor: "red",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%",
  },
  item: {
    borderColor: "green",
    borderWidth: 1,
    height: 250,
    marginBottom: 10,
    width: "100%",
  },
  list: {
    overflow: "hidden",
  },
  sticky: {
    backgroundColor: "#2555FF50",
    borderColor: "blue",
    borderWidth: 5,
    height: 100,
    marginBottom: 6,
    width: "100%",
  },
  orderContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  orderText: {
    color: APP_COLOR.GREY,
  },
  orderPrice: {
    fontWeight: "600",
  },
  orderButton: {
    backgroundColor: APP_COLOR.ORANGE,
    padding: 10,
    borderRadius: 3,
  },
  orderButtonPressed: {
    opacity: 0.5,
  },
  orderButtonText: {
    color: "white",
    textAlign: "center",
  },
});
export default HomeTab;
