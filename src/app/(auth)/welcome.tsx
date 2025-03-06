import { Text, View, StyleSheet, ImageBackground, Image } from "react-native";
import ShareButton from "components/button/share.button";
import { APP_COLOR } from "utils/constant";
import bg from "@/assets/auth/welcome-background.jpg";
import fbLogo from "@/assets/auth/facebook.png";
import ggLogo from "@/assets/auth/google.png";
import { LinearGradient } from "expo-linear-gradient";
import TextBetweenLine from "@/components/button/text.between.line";
import { Link, router } from "expo-router";
import logo from "@/assets/logo.png";
import { FONTS, typography } from "@/theme/typography";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  welcomeText: {
    flex: 0.6,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 20,
    position: "relative",
  },
  textBackground: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 50,
    zIndex: -1,
    height: 130,
  },
  heading: {
    fontSize: 60,
    fontFamily: FONTS.bold,
    color: APP_COLOR.YELLOW,
  },
  body: {
    fontSize: 35,
    fontFamily: FONTS.regular,
    color: APP_COLOR.ORANGE,
    marginLeft: 170,
  },
  imgLogo: {
    position: "absolute",
    top: 0,
    left: 90,
    height: 200,
    width: 200,
    marginBottom: 30,
  },
  welcomeBtn: {
    flex: 0.4,
    gap: 30,
  },
  shareButton: {
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  btnText: {
    textTransform: "uppercase",
    fontFamily: FONTS.medium,
    fontWeight: "600",
  },
  signUpText: {
    color: "white",
    textDecorationLine: "underline",
    fontFamily: FONTS.regular,
  },
  loginBtn: {
    justifyContent: "center",
    borderRadius: 30,
    marginHorizontal: 50,
    paddingVertical: 10,
    backgroundColor: "#2c2c2c",
    borderColor: "#505050",
    borderWidth: 1,
  },
  normalText: {
    ...typography.bodyMedium,
    color: "white",
  },
  loginBtnText: {
    ...typography.labelLarge,
    color: "#fff",
    paddingVertical: 5,
  },
});

const WelcomePage = () => {
  return (
    <ImageBackground style={{ flex: 1 }} source={bg}>
      <LinearGradient
        style={{ flex: 1 }}
        colors={["transparent", "#191B2F"]}
        locations={[0.2, 0.8]}
      >
        <View style={styles.container}>
          <View style={styles.welcomeText}>
            <Image style={styles.imgLogo} source={logo} />
            <View style={styles.textBackground}></View>
            <Text style={styles.heading}>Tấm Tắc</Text>
            <Text style={styles.body}>xin chào.</Text>
          </View>

          <View style={styles.welcomeBtn}>
            <TextBetweenLine
              title="Đăng nhập với"
              textStyle={typography.bodyMedium}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 30,
              }}
            >
              <ShareButton
                title="faceBook"
                onPress={() => {
                  alert("me");
                }}
                textStyle={styles.btnText}
                btnStyle={styles.shareButton}
                icons={<Image source={fbLogo} />}
              />
              <ShareButton
                title="google"
                onPress={() => {
                  alert("me");
                }}
                textStyle={styles.btnText}
                btnStyle={styles.shareButton}
                icons={<Image source={ggLogo} />}
              />
            </View>
            <View>
              <ShareButton
                title="Đăng nhập với email"
                onPress={() => {
                  router.navigate("/(auth)/login");
                }}
                textStyle={styles.loginBtnText}
                btnStyle={styles.loginBtn}
                pressStyle={{ alignSelf: "stretch" }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <Text style={styles.normalText}>Chưa có tài khoản?</Text>
              <Link href={"/(auth)/signup"}>
                <Text style={styles.signUpText}>Đăng ký.</Text>
              </Link>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default WelcomePage;
