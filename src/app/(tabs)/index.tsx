import CustomFlatList from "@/components/CustomFlatList/CustomFlatList";
import CollectionHome from "@/components/home/collection.home";
import HeaderHome from "@/components/home/header.home";
import SearchHome from "@/components/home/search.home";
import TopListHome from "@/components/home/top.list.home";
import ItemQuantity from "@/components/example/restaurant/order/item.quantity";
import { useCurrentApp } from "@/context/app.context";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Pressable, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { APP_COLOR } from "@/utils/constant";
import { currencyFormatter } from "@/utils/api";
import Animated, {
  FadeIn,
  SlideInDown,
  FadeOut,
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";

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
  const [showCart, setShowCart] = useState(false);
  const [showPriceUpdate, setShowPriceUpdate] = useState(false);
  const [priceUpdateAmount, setPriceUpdateAmount] = useState(0);
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

  const handleQuantityChange = (amount: number) => {
    setPriceUpdateAmount(amount);
    setShowPriceUpdate(true);
    setTimeout(() => {
      setShowPriceUpdate(false);
    }, 2000);
  };

  const totalPrice = restaurant?._id ? cart[restaurant._id]?.sum || 0 : 0;
  const totalQuantity = restaurant?._id
    ? cart[restaurant._id]?.quantity || 0
    : 0;

  const cartItems = restaurant?._id
    ? Object.values(cart[restaurant._id]?.items || {})
    : [];

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
            onQuantityChange={handleQuantityChange}
          />
        )}

      {showPriceUpdate && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.priceUpdateContainer}
        >
          <Text style={styles.priceUpdateText}>
            {priceUpdateAmount > 0 ? "+" : ""}
            {currencyFormatter(priceUpdateAmount)}
          </Text>
        </Animated.View>
      )}

      {totalQuantity > 0 && (
        <Pressable style={styles.cartButton} onPress={() => setShowCart(true)}>
          <AntDesign name="shoppingcart" size={24} color="white" />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{totalQuantity}</Text>
          </View>
          <View style={styles.cartButtonContent}>
            <Text style={styles.cartButtonText}>Giỏ hàng</Text>
            <Text style={styles.cartButtonPrice}>
              {currencyFormatter(totalPrice)}
            </Text>
          </View>
        </Pressable>
      )}

      {showCart && (
        <Animated.View entering={FadeIn} style={styles.modalOverlay}>
          <Pressable
            style={styles.modalBackground}
            onPress={() => setShowCart(false)}
          />
          <Animated.View entering={SlideInDown} style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Giỏ hàng</Text>
              <AntDesign
                name="close"
                size={24}
                color="grey"
                onPress={() => setShowCart(false)}
              />
            </View>
            <ScrollView style={styles.cartScroll}>
              {cartItems.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <View style={styles.cartItemInfo}>
                    <Text style={styles.cartItemTitle}>{item.data.title}</Text>
                    <Text style={styles.cartItemQuantity}>
                      Số lượng: {item.quantity}
                    </Text>
                  </View>
                  <Text style={styles.cartItemPrice}>
                    {currencyFormatter(item.data.basePrice * item.quantity)}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.modalFooter}>
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
                onPress={() => {
                  setShowCart(false);
                  router.push("/(user)/product/place.order");
                }}
              >
                <Text style={styles.orderButtonText}>
                  Đặt đơn - {currencyFormatter(totalPrice)}
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        </Animated.View>
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
  cartButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: APP_COLOR.ORANGE,
    borderRadius: 8,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: 20,
    backgroundColor: "red",
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  cartBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  cartButtonContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 15,
  },
  cartButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cartButtonPrice: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    zIndex: 1000,
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cartScroll: {
    maxHeight: 400,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  cartItemQuantity: {
    fontSize: 12,
    color: APP_COLOR.GREY,
    marginTop: 4,
  },
  cartItemPrice: {
    color: APP_COLOR.ORANGE,
    fontWeight: "600",
  },
  modalFooter: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  orderText: {
    color: APP_COLOR.GREY,
  },
  orderPrice: {
    fontWeight: "600",
  },
  orderButton: {
    backgroundColor: APP_COLOR.ORANGE,
    padding: 15,
    borderRadius: 8,
  },
  orderButtonPressed: {
    opacity: 0.5,
  },
  orderButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
  priceUpdateContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -50 }, { translateY: -50 }],
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    zIndex: 1001,
  },
  priceUpdateText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
export default HomeTab;
