import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Container, Header, SubTitle, Title, Footer, Form } from "./styles";

export const SignIn = () => {
  const theme = useTheme();

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <Title>Estamos{"\n"}quase lá.</Title>
        <SubTitle>
          Faça seu login para começar{"\n"}
          uma experiência incrível
        </SubTitle>
      </Header>

      <Form>
        <Input
          placeholder="E-mail"
          iconName="mail"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
        />
      </Form>

      <Footer>
        <Button
          title="Login"
          onPress={() => {}}
          enabled={false}
          loading={false}
        />
        <Button
          title="Criar conta gratuita"
          color={theme.colors.background_secondary}
          onPress={() => {}}
          light
          enabled={false}
          loading={false}
        />
      </Footer>
    </Container>
  );
};
