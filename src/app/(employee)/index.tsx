import React, { useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Calendar } from "react-native-calendars";
import EmployeeHeader from "@/components/employee/topheader.employee";

const HomePage = () => {
  const today = new Date();
  const currentDate = today.toISOString().split("T")[0];

  const test = ["2025-03-19", "2025-03-21"];

  type taskDate = {
    marked: boolean;
    selectedTextColor: string;
  };

  const [markedDates, setMarkedDates] = useState<{
    [key: string]: {
      selected?: boolean;
      selectedColor?: string;
      selectedTextColor?: string;
    };
  }>({});

  const initializeMarkedDates = () => {
    const initialMarkedDates = test.reduce<{ [key: string]: taskDate }>(
      (acc, date) => {
        acc[date] = {
          marked: true,
          selectedTextColor: "white",
        };
        return acc;
      },
      {}
    );
    return initialMarkedDates;
  };

  const markedSelectDate = (day: any) => {
    const selectedDay = day.dateString;

    const newMarkedDates = {
      [selectedDay]: {
        selected: true,
        selectedColor: "orange",
        selectedTextColor: "white",
      },
      ...initializeMarkedDates(),
    };

    setMarkedDates(newMarkedDates);
  };

  const combinedMarkedDates = {
    ...initializeMarkedDates(),
    ...markedDates,
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <EmployeeHeader
          employeeName="Minz"
          employeeCode="123456"
          branchName="Tam Tac NVH"
        />
      </View>
      <Calendar
        current={currentDate}
        markedDates={combinedMarkedDates}
        onDayPress={markedSelectDate}
      />
    </SafeAreaView>
  );
};

export default HomePage;
