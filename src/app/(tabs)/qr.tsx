import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Dimensions } from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import tamtac from "@/assets/logo.png";
import { APP_COLOR } from "@/utils/constant";

const { width } = Dimensions.get("window");

export default function QRScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (scanningResult: BarCodeScannerResult) => {
    setScanned(true);
    alert(`Mã QR đã được quét!\nDữ liệu: ${scanningResult.data}`);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Đang yêu cầu quyền truy cập camera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Không có quyền truy cập camera</Text>
        <Button
          title="Yêu cầu quyền"
          onPress={() => BarCodeScanner.requestPermissionsAsync()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quét mã QR</Text>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
        <View style={styles.overlay}>
          <View style={styles.unfocusedContainer}></View>
          <View style={styles.middleContainer}>
            <View style={styles.unfocusedContainer}></View>
            <View style={styles.focusedContainer}>
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />
            </View>
            <View style={styles.unfocusedContainer}></View>
          </View>
          <View style={styles.unfocusedContainer}></View>
        </View>
      </View>
      {scanned && (
        <Button
          title="Quét lại"
          onPress={() => setScanned(false)}
          color={APP_COLOR.ORANGE}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: APP_COLOR.ORANGE,
  },
  scannerContainer: {
    width: width,
    height: width,
    position: "relative",
    overflow: "hidden",
  },
  scanner: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: "#EBD187",
  },
  middleContainer: {
    flexDirection: "row",
    flex: 2,
  },
  focusedContainer: {
    flex: 2,
    position: "relative",
  },
  cornerTopLeft: {
    position: "absolute",
    top: -10,
    left: -10,
    width: 40,
    height: 40,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: APP_COLOR.ORANGE,
  },
  cornerTopRight: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 40,
    height: 40,
    zIndex: 999,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: APP_COLOR.ORANGE,
  },
  cornerBottomLeft: {
    position: "absolute",
    bottom: -10,
    left: -10,
    zIndex: 999,
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: APP_COLOR.ORANGE,
  },
  cornerBottomRight: {
    position: "absolute",
    bottom: -10,
    right: -10,
    zIndex: 999,
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: APP_COLOR.ORANGE,
  },
});
