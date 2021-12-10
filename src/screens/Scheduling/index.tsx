import React, { useState } from "react";
import { useTheme } from "styled-components";
import { BackButton } from "../../components/BackButton";
import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  Content,
  Footer
} from "./styles";

import ArrowSvg from "../../assets/arrow.svg";
import { Alert, StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar, DayProps } from "../../components/Calendar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { generateInterval } from "../../components/Calendar/generateInterval";
import { CalendarProps } from "react-native-calendars";
import { addDays, format } from "date-fns";
import { CarDTO } from "../../dtos/CarDTO";

interface Params {
  car: CarDTO;
}
interface NavigatorProps {
  navigate: (screen: string) => void;
  goBack: () => void;
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
}

export const Scheduling = () => {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>(
    {} as DayProps
  );
  const [markedDates, setMarketDates] = useState<CalendarProps["markedDates"]>(
    {} as CalendarProps["markedDates"]
  );
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const route = useRoute();
  const { car } = route.params as Params;

  const handleConfirmRental = () => {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert("Selecione o intervalo do aluguel");
    } else {
      navigation.navigate("ScheduleDetails", {
        car,
        dates: markedDates
      });
    }
  };

  const handleGoback = () => {
    navigation.goBack();
  };

  const handleChangeDate = (date: DayProps) => {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarketDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(addDays(new Date(firstDate), 1), "dd/MM/yyyy"),
      endFormatted: format(addDays(new Date(endDate), 1), "dd/MM/yyyy")
    });
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <BackButton onPress={handleGoback} color={theme.colors.shape} />

        <Title>
          Escolha uma{"\n"} data de início e{"\n"} fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.startFormatted}>
              {rentalPeriod.startFormatted}
            </DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              {rentalPeriod.endFormatted}
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24 }}
      >
        <Calendar markedDates={markedDates} onDayPress={handleChangeDate} />
      </Content>

      <Footer>
        <Button
          title="Confirmar"
          onPress={handleConfirmRental}
          enabled={!!rentalPeriod.endFormatted}
        />
      </Footer>
    </Container>
  );
};
