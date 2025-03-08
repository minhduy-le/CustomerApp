import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatPage = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View style={{ padding: 10 }}>
        <Text> Chat page</Text>
      </View>
    </SafeAreaView>
  );
};

export default ChatPage;
