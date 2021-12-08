import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImgeSlider";
import { Container, Header, CarImages } from "./styles";

export const CardDetails = () => {
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
    </Container>
  );
};
