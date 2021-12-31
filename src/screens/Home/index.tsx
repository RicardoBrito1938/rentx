import { StatusBar, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { LoadAnimation } from "../../components/LoadAnimation";
import { useTheme } from "styled-components";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring
} from "react-native-reanimated";
import { PanGestureHandler, RectButton } from "react-native-gesture-handler";

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

interface NavigatorProps {
  navigate: (screen: string, params?: object) => void;
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center"
  }
});

export const Home = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigatorProps>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    }
  });

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate("CarDetails", { car });
  };

  const handleOpenMyCars = () => {
    navigation.navigate("MyCars");
  };

  useEffect(() => {
    let isMounted = true;
    const fetchCars = async () => {
      try {
        const { data } = await api.get("/cars");
        if (isMounted) {
          setCars(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCars();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(102)} height={RFValue(12)} />
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? (
        <LoadAnimation />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      {/* <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            { position: "absolute", bottom: 13, right: 22 }
          ]}
        >
          <ButtonAnimated
            style={[styles.button, { backgroundColor: theme.colors.main }]}
            onPress={handleOpenMyCars}
          >
            <Ionicons
              size={32}
              name="ios-car-sport"
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler> */}
    </Container>
  );
};
