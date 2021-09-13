import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const AddScreen = ({ navigation }) => {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const cameraRef = useRef(null);

  const initial = async () => {
    const permissionCamera = await Camera.requestPermissionsAsync();
    setHasCameraPermission(permissionCamera.status === "granted");
  };

  const openImagePickerAsync = async () => {
    const permissionGalery =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionGalery.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setImage(pickerResult.uri);
  };

  const takePicture = async () => {
    if (!cameraRef.current) {
      return;
    }

    const data = await cameraRef.current.takePictureAsync(null);
    setImage(data.uri);
  };

  useEffect(() => {
    initial();
  }, []);

  if (hasCameraPermission === null) {
    return <View />;
  }

  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.fixedRatio}
          type={type}
          ratio={"1:1"}
          ref={cameraRef}
        />
      </View>
      <Button
        title="Flip Image"
        onPress={() => {
          setType(
            type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back
          );
        }}
      />
      <Button title="Take Picture" onPress={takePicture} />
      <Button title="Galery" onPress={openImagePickerAsync} />
      <Button
        title="Save"
        onPress={() => navigation.navigate("Save", { image })}
      />
      {image && <Image source={{ uri: image }} style={{ flex: 1 }} />}
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
});

export default AddScreen;
