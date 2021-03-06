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
import { useNetInfo } from "@react-native-community/netinfo";

interface NavigatorProps {
  navigate: (screen: string, params?: any) => void;
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
  const netInfo = useNetInfo();
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const theme = useTheme();

  const navigation = useNavigation<NavigatorProps>();
  const route = useRoute();
  const { car, dates } = route.params as Params;
  const datesKeysList = Object.keys(dates ? dates : []);

  const rentTotal = Number(datesKeysList.length * car.price);

  const handleConfirmRental = async () => {
    setLoading(true);
    try {
      await api
        .post("rentals", {
          user_id: 1,
          car_id: car.id,
          start_date: new Date(datesKeysList[0]),
          end_date: new Date(datesKeysList[datesKeysList.length - 1]),
          total: rentTotal
        })
        .then(() =>
          navigation.navigate("Confirmation", {
            nextScreenRoute: "Home",
            title: "Carro alugado",
            message: `Agora voc?? s?? precisa ir\n
            at?? a concession??ria da rentX \n
            pegar o seu autom??vel`
          })
        )
        .catch(() => Alert.alert("N??o foi poss??vel confirmar o agendamento"));
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

  useEffect(() => {
    const fetchCardUpdated = async () => {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    };
    if (netInfo.isConnected === true) {
      fetchCardUpdated();
    }
  }, [netInfo.isConnected]);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider
          imagesUrl={
            !!carUpdated.photos
              ? carUpdated.photos
              : [{ id: car.thumbnail, photo: car.thumbnail }]
          }
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
            <Brand>{car.brand} </Brand>
            <Name>{car.name} </Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {car.price}</Price>
          </Rent>
        </Details>

        {carUpdated.accessories && (
          <Accessories>
            {carUpdated.accessories.map(accessory => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
              />
            ))}
          </Accessories>
        )}

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
              R{`$ ${car.price} x${datesKeysList.length} di??rias`}
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
