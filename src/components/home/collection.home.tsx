import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Platform,
  Pressable,
  Dimensions,
  SafeAreaView,
} from "react-native";
import demo from "@/assets/demo.jpg";
import { APP_COLOR } from "@/utils/constant";
import { useEffect, useState } from "react";
import { getTopRestaurants } from "@/utils/api";
import { router } from "expo-router";
import ContentLoader, { Rect, Circle, Path } from "react-content-loader/native";
interface IProps {
  name: string;
  description: string;
  refAPI: string;
}
const { height: sHeight, width: sWidth } = Dimensions.get("window");
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
  const data = [
    { key: 1, image: demo, name: "Cửa hàng 1" },
    { key: 2, image: demo, name: "Cửa hàng 2" },
    { key: 3, image: demo, name: "Cửa hàng 3" },
    { key: 4, image: demo, name: "Cửa hàng 4" },
    { key: 5, image: demo, name: "Cửa hàng 5" },
  ];
  const [restaurants, setRestaurants] = useState<ITopRestaurants[] | []>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fecthData = async () => {
      setLoading(true);
      const res = await getTopRestaurants(refAPI);
      if (res.data) {
        setRestaurants(res.data);
      } else {
      }
      setLoading(false);
    };
    fecthData();
  }, [refAPI]);
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
            style={{ justifyContent: "space-between", flexDirection: "row" }}
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
            <Text style={{ color: "5a5a5a" }}>Xem tất cả</Text>
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={{ color: "5a5a5a" }}>{description}</Text>
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
                  <View style={{ backgroundColor: "#efefef" }}>
                    <Image
                      style={{ height: 130, width: 130 }}
                      source={{ uri: `${baseImage}/${item.image}` }}
                    />
                    <View style={{ padding: 5 }}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ fontWeight: "600", maxWidth: 130 }}
                      >
                        {item.name}
                      </Text>
                      <View style={styles.sale}>
                        <Text style={{ color: APP_COLOR.ORANGE }}>
                          Flash Sale
                        </Text>
                      </View>
                    </View>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>
      ) : (
        <SafeAreaView>
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
        </SafeAreaView>
      )}
    </>
  );
};

export default CollectionHome;
