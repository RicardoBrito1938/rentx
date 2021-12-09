import React from "react";
import { Accessory } from "../../components/Accesssory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImgeSlider";

import speedSVG from "../../assets/speed.svg";
import accelerationSVG from "../../assets/acceleration.svg";
import forceSVG from "../../assets/force.svg";
import gasolineSVG from "../../assets/gasoline.svg";
import exchangeSVG from "../../assets/exchange.svg";
import peopleSVG from "../../assets/people.svg";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accessories,
  Footer
} from "./styles";
import { Button } from "../../components/Button";
import { useNavigation } from "@react-navigation/native";

interface NavigatorProps {
  navigate: (screen: string) => void;
}

export const CarDetails = () => {
  const navigation = useNavigation<NavigatorProps>();

  const handleConfirmRental = () => {
    navigation.navigate("Scheduling");
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={[
            "https://e7.pngegg.com/pngimages/215/409/png-clipart-audi-audi.png"
          ]}
        />
      </CarImages>

      <Content
        contentContainerStyle={{
          padding: 24,
          alignItems: "center"
        }}
        showsVerticalScrollIndicator={false}
      >
        <Details>
          <Description>
            <Brand>Ferrari</Brand>
            <Name>Ferrari</Name>
          </Description>

          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580,00</Price>
          </Rent>
        </Details>

        <Accessories>
          <Accessory name="380km/km" icon={speedSVG} />
          <Accessory name="3.2s" icon={accelerationSVG} />
          <Accessory name="800hp" icon={forceSVG} />
          <Accessory name="Gasolina " icon={gasolineSVG} />
          <Accessory name="Auto" icon={exchangeSVG} />
          <Accessory name="2 Ppssoas" icon={peopleSVG} />
        </Accessories>

        <About>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore eaque
          reiciendis eveniet, minima ipsam at aliquam, maiores, enim ducimus
          iure aut. Ipsam inventore perspiciatis ex voluptates reprehenderit
          doloribus non consequuntur?
        </About>
      </Content>

      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};
