import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImgeSlider";
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
  About
} from "./styles";

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

        <About>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore eaque
          reiciendis eveniet, minima ipsam at aliquam, maiores, enim ducimus
          iure aut. Ipsam inventore perspiciatis ex voluptates reprehenderit
          doloribus non consequuntur?
        </About>
      </Content>
    </Container>
  );
};
