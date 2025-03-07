import ShareButton from "@/components/button/share.button";
import SocialButton from "@/components/button/social.button";
import ShareInput from "@/components/input/share.input";
import { registerAPI } from "@/utils/api";
import { APP_COLOR } from "@/utils/constant";
import { SignUpSchema, CustomerSignUpSchema } from "@/utils/validate.schema";
import axios from "axios";
import { Link, router } from "expo-router";
import { Formik } from "formik";
import { Text, View, StyleSheet } from "react-native";
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    gap: 10,
  },
});

const handleSignUp = async (phoneNumber: string) => {
  const BASE_URL: string = "https://tamtac-6548a8185ba9.herokuapp.com";
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/users/sign-up/customer`,
      {
        phoneNumber: phoneNumber,
      }
    );
    console.log("res" + response);

    if (response.data) {
      router.replace({
        pathname: "/(auth)/verify",
        params: { phoneNumber: phoneNumber },
      });
    } else {
      const message = Array.isArray(response.message)
        ? response.message[0]
        : response.message;

      Toast.show(message, {
        duration: Toast.durations.LONG,
        textColor: "white",
        backgroundColor: APP_COLOR.ORANGE,
        opacity: 1,
      });
    }
  } catch (error) {
    console.log(">>> Error during sign-up: ", error);
  }
};
const CustomerSignUpPage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Formik
        validationSchema={CustomerSignUpSchema}
        initialValues={{ phoneNumber: "" }}
        onSubmit={(values) => {
          console.log("Submit Values:", values);
          handleSignUp(values.phoneNumber);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <View>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: 600,
                  marginVertical: 30,
                }}
              >
                Đăng ký tài khoản khách
              </Text>
            </View>
            <ShareInput
              title="Số điện thoại"
              onChangeText={handleChange("phoneNumber")}
              onBlur={handleBlur("phoneNumber")}
              value={values.phoneNumber}
              error={errors.phoneNumber}
              touched={touched.phoneNumber}
            />
            <View style={{ marginVertical: 10 }}></View>
            <ShareButton
              title="Đăng Ký"
              onPress={handleSubmit}
              textStyle={{
                textTransform: "uppercase",
                color: "#fff",
                paddingVertical: 5,
              }}
              btnStyle={{
                justifyContent: "center",
                borderRadius: 30,
                marginHorizontal: 50,
                paddingVertical: 10,
                backgroundColor: APP_COLOR.ORANGE,
              }}
              pressStyle={{ alignSelf: "stretch" }}
            />

            <View
              style={{
                marginVertical: 15,
                flexDirection: "row",
                gap: 10,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "black",
                }}
              >
                Đã có tài khoản?
              </Text>
              <Link href={"/(auth)/login"}>
                <Text
                  style={{
                    color: APP_COLOR.ORANGE,
                    textDecorationLine: "underline",
                  }}
                >
                  Đăng nhập.
                </Text>
              </Link>
            </View>

            <SocialButton title="Đăng ký với" />
          </View>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default CustomerSignUpPage;
