import { StyleSheet, Text, View, Button, Image } from "react-native";
import React, { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";

const ImageSelect = ({ onImageSelect }) => {
  const [hasGalleryAccess, setHasGalleryAccess] = useState(null);
  const [image, setImage] = useState(null);
  const { userReducer } = useSelector((state) => state);

  const data = {userId: userReducer?.currentUser?._id, username:userReducer?.currentUser?.username, amount}

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryAccess(galleryStatus.status == "granted");
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });
    if (!result?.canceled) {
      onImageSelect(result.assets[0]); // Use the URI of the first selected image
    }
  };

  if (hasGalleryAccess === false) {
    return <Text>No Access to internal Storage</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button title="Pick Image" onPress={() => pickImage()} />
      {/* {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )} */}
    </View>
  );
};

export default ImageSelect;

const styles = StyleSheet.create({});
