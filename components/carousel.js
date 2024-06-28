import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const slides = [
    "https://res.cloudinary.com/mediaxagency/image/upload/v1690870249/open_graph_67f7c2ed2f.png",
    "https://blockonomi.com/wp-content/uploads/2023/11/bitget.jpg",
    "https://lh3.googleusercontent.com/mJ9vlBcsR6s9MxkV9WQJ1WvaUcHQ7FnB2XZgko_zuGZ9s82m-SlllLJTjy_qtYMax9TEKIrkgPS0qfWxoDmS7Kon_w=w640-h400-e365-rj-sc0x00ffffff",
  ];
  return (
    <View style={styles.CarouselContainer}>
      <SliderBox
        images={slides}
        dotColor="#00FFFF"
        inactiveDotColor="#D3D3D3"
        ImageComponentStyle={{ borderRadius: 15, width: "95%", marginTop: 15 }}
        autoplay={true}
        circleLoop={true}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  CarouselContainer: {
    flex: 1,
    alignItems: "center",
  },
});
