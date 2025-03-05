import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { APP_COLOR } from "@/utils/constant";
import { TextInput } from "react-native-gesture-handler";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import debounce from "debounce";
import { filterRestaurantAPI, getRestaurantByNameAPI, getURLBaseBackend } from "@/utils/api";



const RestaurantsPage = () => {
    const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);

    useEffect(() => {
        const fetchInitData = async () => {
            const res = await filterRestaurantAPI(`current=1&pageSize=${pageSize}`);
            if (res.data) {
                setRestaurants(res.data.results)
            }
        }

        fetchInitData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const res = await filterRestaurantAPI(`current=${currentPage}&pageSize=${pageSize}`);
            if (res.data) {
                setRestaurants([...restaurants, ...res.data.results])
            }
        }
        if (currentPage > 1) {
            fetchData();
        }
    }, [currentPage])

    const handleSearch = debounce(async (text: string) => {
        setSearchTerm(text);
        if (!text) return;

        const res = await getRestaurantByNameAPI(text);
        if (res.data) {
            setRestaurants(res.data.results)
        }
    }, 300)

    const handleEndReached = async () => {
        setCurrentPage(prev => prev + 1);
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{
                flexDirection: "row", gap: 5,
                alignItems: "center",
                padding: 10
            }}>
                <MaterialIcons
                    onPress={() => router.back()}
                    name="arrow-back" size={24}
                    color={APP_COLOR.ORANGE}
                />
                <TextInput
                    placeholder="Tìm kiếm cửa hàng..."
                    onChangeText={(text: string) => handleSearch(text)}
                    style={{
                        flex: 1,
                        backgroundColor: "#eee",
                        paddingVertical: 3,
                        paddingHorizontal: 10,
                        borderRadius: 3
                    }}
                />
            </View>
            <View style={{ flex: 1 }}>
                <FlatList
                    onEndReachedThreshold={0.5}
                    onEndReached={handleEndReached}
                    data={restaurants}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => router.navigate({
                                pathname: "/product/[id]",
                                params: { id: item._id }
                            })}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                padding: 10,
                                gap: 10,
                                borderBottomColor: "#eee",
                                borderBottomWidth: 1
                            }}>
                            <Image
                                source={{ uri: `${getURLBaseBackend()}/images/restaurant/${item.image}` }}
                                style={{ height: 100, width: 100 }}
                            />
                            <Text>{item.name}</Text>
                        </Pressable>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default RestaurantsPage;