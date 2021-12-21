import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback
} from "react-native";
import { useTheme } from "styled-components";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import { Container, Header, SubTitle, Title, Footer, Form } from "./styles";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../hooks/auth";

interface NavigationProps {
  navigate: (screen: string) => void;
}

export const SignIn = () => {
  const navigation = useNavigation<NavigationProps>();
  const { signIn, user } = useAuth();

  const theme = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("Senha é obrigatória")
      });

      await schema.validate({ email, password });
      Alert.alert("Tudo certo!");

      signIn({ email, password });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      } else {
        Alert.alert("Erro na autenticação, verifique suas credenciais");
      }
    }
  };

  const handleNewAccount = () => {
    navigation.navigate("FirstStep");
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              placeholder="Password"
              iconName="lock"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setPassword}
              value={password}
            />
          </Form>

          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              light
              enabled={true}
              loading={false}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
