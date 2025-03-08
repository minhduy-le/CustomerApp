import EmployeeHeader from "@/components/employee/topheader.employee";
import { SafeAreaView, View } from "react-native";

const HomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <EmployeeHeader
          employeeName="Minz"
          employeeCode="123456"
          branchName="Tam Tac NVH"
        />
      </View>
    </SafeAreaView>
  );
};
export default HomePage;
