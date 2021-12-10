import { StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList,
  MyCarsButton
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { useNavigation } from "@react-navigation/native";

import api from "../../services/api";
import { CarDTO } from "../../dtos/CarDTO";
import { Loading } from "../../components/Loading";
import { useTheme } from "styled-components";

interface NavigatorProps {
  navigate: (screen: string, params?: object) => void;
}

export const Home = () => {
  const theme = useTheme();
  const navigation = useNavigation<NavigatorProps>();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate("CarDetails", { car });
  };

  const handleOpenMyCars = () => {
    navigation.navigate("MyCars");
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get("/cars");
        setCars(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
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
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      {loading ? (
        <Loading />
      ) : (
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons size={32} name="ios-car-sport" color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  );
};
