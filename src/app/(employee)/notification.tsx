import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NotificationPage = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={{ padding: 10 }}>
        <Text> notification page</Text>
      </View>
    </SafeAreaView>
  );
};

export default NotificationPage;
