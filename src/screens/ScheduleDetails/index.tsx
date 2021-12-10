import React, { useEffect, useState } from "react";
import { Accessory } from "../../components/Accesssory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImgeSlider";

import { Feather } from "@expo/vector-icons";

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
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from "./styles";
import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessoryIcon";
import { CalendarProps } from "react-native-calendars";
import { addDays, format } from "date-fns";
import api from "../../services/api";
import { Alert } from "react-native";

interface NavigatorProps {
  navigate: (screen: string) => void;
  goBack: () => void;
}

interface Params {
  car: CarDTO;
  dates: CalendarProps["markedDates"];
}

interface RentalPeriod {
  start: string;
  end: string;
}

export const ScheduleDetails = () => {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const theme = useTheme();

  const navigation = useNavigation<NavigatorProps>();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const datesKeysList = Object.keys(dates ? dates : []);

  const rentTotal = Number(datesKeysList.length * car.rent.price);

  const handleConfirmRental = async () => {
    setLoading(true);
    try {
      const scheduleByCar = await api.get(`schedules_bycars/${car.id}`);
      const unavailable_dates = [
        ...scheduleByCar.data.unavailable_dates,
        ...datesKeysList
      ];

      await api.post("schedules_byuser", {
        user_id: 1,
        car,
        startDate: format(addDays(new Date(datesKeysList[0]), 1), "dd/MM/yyyy"),
        endDate: format(
          addDays(new Date(datesKeysList[datesKeysList.length - 1]), 1),
          "dd/MM/yyyy"
        )
      });

      api
        .put(`/schedules_bycars/${car.id}`, {
          id: car.id,
          unavailable_dates
        })
        .then(() => navigation.navigate("SchedulingComplete"))
        .catch(() => Alert.alert("Não foi possível confirmar o agendamento"));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setRentalPeriod({
      start: format(addDays(new Date(datesKeysList[0]), 1), "dd/MM/yyyy"),
      end: format(
        addDays(new Date(datesKeysList[datesKeysList.length - 1]), 1),
        "dd/MM/yyyy"
      )
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider imagesUrl={car.photos} />
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
            <Brand>{car.brand} </Brand>
            <Name>{car.name} </Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car.accessories.map(accessory => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)}
            />
          ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R{`$ ${car.rent.price} x${datesKeysList.length} diárias`}
            </RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
};
