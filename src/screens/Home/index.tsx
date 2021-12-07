import { StatusBar } from "react-native";
import React from "react";
import { Container, Header, TotalCars, HeaderContent } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";

export const Home = () => {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(102)} height={RFValue(102)} />
          <TotalCars>Todal de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
    </Container>
  );
};
