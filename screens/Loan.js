import {
  View,
  Text,
  Image,
  Pressable,
  Clipboard,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Ionicons,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  ScrollView,
  TextInput,
} from "react-native-gesture-handler";
// import {  } from 'react-native-web'

import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import { api_url } from "../config";
import { useSelector } from "react-redux";

const Loan = ({ navigation }) => {
  const user = useSelector((state) => state?.userReducer?.currentUser);
  const [selectedImages, setSelectedImages] = useState([]);
  console.log(user);

  const pickImages = async (data) => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        multiple: true, // Allow multiple image selection
      });

      if (!result.canceled) {
        console.log("REQSULT", result);
        let imageArray = selectedImages;
        imageArray.splice(data - 1, 0, result.assets[0].uri);
        setSelectedImages([...imageArray]);
        console.log("UPDATED", selectedImages);
      }
    } catch (error) {
      console.error("Error picking images:", error);
    }
  };

  const uploadImages = async () => {
    if (selectedImages.length === 3) {
      const uploadUrl = `${api_url}/loan/createLoan`; // Replace with your actual upload endpoint

      const formData = new FormData();

      selectedImages.forEach(async (imageUri, index) => {
        const filename = imageUri.split("/").pop();
        const type = "image/jpeg"; // Adjust the image type as needed

        const fileContent = await FileSystem.readAsStringAsync(imageUri, {
          encoding: FileSystem.EncodingType.Base64,
        });

        formData.append("images", {
          uri: imageUri,
          name: filename,
          type,
          content: fileContent,
        });
        formData.append("userData", JSON.stringify({ user }));

        if (index === selectedImages.length - 1) {
          // Last iteration, perform the upload
          fetch(uploadUrl, {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
            .then((response) => response.json())
            .then((result) => {
              console.log("Upload result:", result);
              Toast.show({
                type: "success",
                text1: "Loan Request",
                text2: "Request submitted successfully",
              });
              setSelectedImages([]);
            })
            .catch((error) => {
              console.error("Error uploading images:", error);
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Error in loan Request, Try again",
              });
            });
        }
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "please select all image",
      });
    }
  };

  // __________________________________________
  //     const [image1, setImage1] = useState(null);
  //     const [image2, setImage2] = useState(null);
  //     const [image3, setImage3] = useState(null);
  //     console.log("URII",image1, image2, image3)

  //   const data = {
  //     userId: "sdfa",
  //     username: "userReducer?.currentUser?.username",
  //     amount: "413",
  //     currency: "USDT-ERC",
  //   };
  //   const depositData = JSON.stringify(data);

  //   const openImagePickerAsync = async (data) => {
  //     let permissionResult =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (permissionResult.granted === false) {
  //       alert("Permission to access camera roll is required!");
  //       return;
  //     }
  //     let pickerResult = await ImagePicker.launchImageLibraryAsync();
  //     if(data == 1){
  //         setImage1(pickerResult?.assets[0].uri);
  //     }else if(data == 2){
  //         setImage2(pickerResult?.assets[0].uri);
  //     }else if(data == 3){
  //         setImage3(pickerResult?.assets[0].uri);
  //     }
  //   };

  //   const handleDeposit = async () => {
  //     try {
  //       if ( !image1) {
  //         Toast.show({
  //           type: "error",
  //           text1: "Error",
  //           text2: "Please enter the deposit amount and select an image.",
  //         });
  //         return;
  //       } else {
  //         const uploadResult = await FileSystem.uploadAsync(
  //           `${api_url}/test`,
  //           image1,
  //           {
  //             httpMethod: "POST",
  //             uploadType: FileSystem.FileSystemUploadType.MULTIPART,
  //             fieldName: "media",
  //             headers: {
  //               data: depositData
  //             },
  //           }
  //         );
  //         Toast.show({
  //           type: "success",
  //           text1: "Success",
  //           text2: "Deposit request sent successfully.",
  //         });
  //         setImage1(null);
  //         setImage2(null);
  //         setImage3(null);

  //       }
  //     } catch (e) {
  //         console.log("ERROR", e)
  //       Toast.show({
  //         type: "error",
  //         text1: "Error",
  //         text2: "Failed to send deposit request.",
  //       });
  //     }
  //   };

  return (
    <GestureHandlerRootView>
      <SafeAreaView style={{
        backgroundColor: "white"
      }}>
      <ScrollView>
      <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons
            name="arrow-back-outline"
            size={30}
            color="black"
            style={{
              padding: 5,
              marginLeft: 10,
              marginTop: 10,
            }}
            onPress={() => navigation.goBack("")}
          />
          <Text
            style={{
              padding: 5,
              marginLeft: 5,
              marginTop: 10,
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Loan
          </Text>
          </View>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          </View>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              padding: 5,
              marginTop: 10,
              marginRight: 10
            }}
          >
            <Ionicons
            name="information-circle-sharp"
            size={25}
            color="black"
            style={{ }}
          />
             <FontAwesome5
            name="history"
            size={22}
            color="black"
            onPress={() => navigation.navigate("LoanHistory")}
          />
          </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              padding: 10,
              marginLeft: 5,
              fontSize: 17,
              color: "red",
            }}
          >
            After the platforms reviews your application, you can apply for a
            loan from the platform!
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              padding: 10,
              marginLeft: 5,
              fontSize: 15,
              color: "gray",
            }}
          >
            Expected Loan Amount:
          </Text>
          <Text
            style={{
              padding: 10,
              marginLeft: 100,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
            5000 USDT
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "black",
            borderBottomWidth: 0.5,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              padding: 10,
              marginLeft: 5,
              fontSize: 15,
              color: "gray",
            }}
          >
            Repayment Cycle:
          </Text>
          <Text
            style={{
              padding: 10,
              marginLeft: 150,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
            31 Days
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.7,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              padding: 10,
              marginLeft: 5,
              fontSize: 15,
              color: "gray",
            }}
          >
            Daily Rate:
          </Text>
          <Text
            style={{
              padding: 10,
              marginLeft: 200,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
            0.03%
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.7,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              padding: 10,
              marginLeft: 5,
              fontSize: 15,
              color: "gray",
            }}
          >
            Repayment:
          </Text>
          <Text
            style={{
              padding: 10,
              marginLeft: 140,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
            One Repayment Due
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.7,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              padding: 10,
              marginLeft: 5,
              fontSize: 15,
              color: "gray",
            }}
          >
            Interest:
          </Text>
          <Text
            style={{
              padding: 10,
              marginLeft: 200,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
           350 USDT
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.7,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              padding: 10,
              marginLeft: 5,
              fontSize: 15,
              color: "gray",
            }}
          >
            Lending Instituiton:
          </Text>
          <Text
            style={{
              padding: 10,
              marginLeft: 95,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Internetete Charge
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: "gray",
            borderBottomWidth: 0.7,
          }}
        />
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Text
            style={{
              marginLeft: 21,
              fontSize: 15,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Credit Loan - Please make sure the images are clearly visable
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 15,
            marginBottom: 20,
            justifyContent: "space-evenly",
          }}
        >
          <GestureHandlerRootView>
            <TouchableOpacity
              style={{
                height: 180,
                padding: 15,
                width: 200,
                borderRadius: 15,
                backgroundColor: "gray",
                cursor: "pointer",
              }}
              onPress={() => pickImages(1)}
            >
              {selectedImages.length > 0 && selectedImages[0] ? (
                <Image
                  source={{ uri: selectedImages[0] }}
                  style={{
                    alignItems: "center",
                    padding: 62,
                    borderWidth: 1,
                    borderColor: "white",
                    borderStyle: "dashed",
                    height: "100%",
                  }}
                />
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    padding: 62,
                    borderWidth: 1,
                    borderColor: "white",
                    borderStyle: "dashed",
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera-plus"
                    size={30}
                    color="white"
                  />
                </View>
              )}
            </TouchableOpacity>
          </GestureHandlerRootView>
          <GestureHandlerRootView>
            <TouchableOpacity
              style={{
                height: 180,
                padding: 15,
                width: 200,
                borderRadius: 15,
                backgroundColor: "gray",
                cursor: "pointer",
              }}
              onPress={() => pickImages(2)}
            >
              {selectedImages.length > 0 && selectedImages[1] ? (
                <Image
                  source={{ uri: selectedImages[1] }}
                  style={{
                    alignItems: "center",
                    padding: 62,
                    borderWidth: 1,
                    borderColor: "white",
                    borderStyle: "dashed",
                    height: "100%",
                  }}
                />
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    padding: 62,
                    borderWidth: 1,
                    borderColor: "white",
                    borderStyle: "dashed",
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera-plus"
                    size={30}
                    color="white"
                  />
                </View>
              )}
            </TouchableOpacity>
          </GestureHandlerRootView>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            gap: 60,
          }}
        >
          <Text style={{ color: "gray" }}>Font Photo of handheld</Text>
          <Text style={{ color: "gray" }}>ID Card - Front Side</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginTop: 15,
            marginBottom: 20,
            justifyContent: "space-evenly",
          }}
        >
          <GestureHandlerRootView>
            <TouchableOpacity
              style={{
                height: 180,
                padding: 15,
                width: 200,
                borderRadius: 15,
                backgroundColor: "gray",
                cursor: "pointer",
              }}
              onPress={() => pickImages(3)}
            >
              {selectedImages.length > 0 && selectedImages[2] ? (
                <Image
                  source={{ uri: selectedImages[2] }}
                  style={{
                    alignItems: "center",
                    padding: 62,
                    borderWidth: 1,
                    borderColor: "white",
                    borderStyle: "dashed",
                    height: "100%",
                  }}
                />
              ) : (
                <View
                  style={{
                    alignItems: "center",
                    padding: 62,
                    borderWidth: 1,
                    borderColor: "white",
                    borderStyle: "dashed",
                  }}
                >
                  <MaterialCommunityIcons
                    name="camera-plus"
                    size={30}
                    color="white"
                  />
                </View>
              )}
            </TouchableOpacity>
          </GestureHandlerRootView>
          <GestureHandlerRootView>
            <Pressable
              style={{
                alignItems: "center",
                padding: 13,
                width: 200,
                borderRadius: 15,
                backgroundColor: "gray",
                cursor: "pointer",
              }}
            >
              <View
                style={{
                  padding: 30,
                  borderWidth: 1,
                  borderColor: "white",
                  borderStyle: "dashed",
                }}
              >
                <Image
                  source={require("../assets/example.png")}
                  style={{ width: 100, height: 100 }}
                ></Image>
              </View>
            </Pressable>
          </GestureHandlerRootView>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            justifyContent: "space-around",
            marginBottom: 20,
          }}
        >
          <Text style={{ justifyContent: "center", color: "gray" }}>
            ID Card- Back Side
          </Text>
          <Text style={{ color: "gray" }}>Example</Text>
        </View>
        <View
          style={{
            marginBottom: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
              backgroundColor: "aqua",
              borderRadius: 25,
              width: 400,
            }}
            onPress={uploadImages}
          >
            <Text
              style={{ color: "white", marginRight: 5, fontWeight: "bold" }}
            >
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Loan;
