import { APP_COLOR } from "@/utils/constant";
import * as React from "react";
import { Text, View, Image, StyleSheet, SafeAreaView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
interface EmployeeCardProps {
  employeeName: string;
  employeeCode: string;
  branchName: string;
}

function EmployeeHeader({
  employeeName,
  employeeCode,
  branchName,
}: EmployeeCardProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.textContainer}>
        <Ionicons
          name="people-outline"
          size={24}
          color="black"
          style={styles.avatar}
        />
        <View>
          <Text style={styles.employeeText}>
            <Text style={styles.boldText}>{employeeName}</Text> - {employeeCode}
          </Text>
          <Text style={styles.branchText}>{branchName}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: APP_COLOR.YELLOW,
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  textContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  employeeText: {
    fontSize: 16,
  },
  avatar: {
    marginHorizontal: 10,
    marginVertical: "auto",
  },
  boldText: {
    fontWeight: "bold",
  },
  branchText: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});

export default EmployeeHeader;
