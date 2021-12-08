import { StatusBar } from "react-native";
import React from "react";
import { Container, Header, TotalCars, HeaderContent, CarList } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";

export const Home = () => {
  const dataCar = {
    brand: "Audi",
    name: "RS5 couque",
    rent: {
      period: "AO DIA",
      price: 120
    },
    thumbnail:
      "https://e7.pngegg.com/pngimages/215/409/png-clipart-audi-audi.png"
  };

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

      <CarList
        data={[1, 2, 3]}
        keyExtractor={item => String(item)}
        renderItem={({ item }) => <Car data={dataCar} />}
      />
    </Container>
  );
};
