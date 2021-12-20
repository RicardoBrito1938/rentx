import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from "react-native";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { Input } from "../../../components/Input";
import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle
} from "./styles";
import * as Yup from "yup";

interface NavigationProps {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}

export const FirstStep = () => {
  const navigation = useNavigation<NavigationProps>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [driveLicense, setDriveLicense] = useState("");

  const handleBack = () => {
    navigation.goBack();
  };

  const handleNextStep = async () => {
    try {
      const schema = Yup.object().shape({
        driveLicense: Yup.string().required("CNH é obrigatório"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("E-mail inválido"),
        name: Yup.string().required("Nome obrigatório")
      });

      const data = { name, email, driveLicense };

      await schema.validate(data);
      navigation.navigate("SecondStep", { user: data });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        return Alert.alert("Opa", error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet active />
              <Bullet active />
            </Steps>
          </Header>

          <Title>Crie sua {"\n"} conta</Title>
          <SubTitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </SubTitle>

          <Form>
            <FormTitle>1.Dados</FormTitle>
            <Input
              iconName="user"
              placeholder="Nome"
              onChangeText={setName}
              value={name}
            />
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              iconName="credit-card"
              placeholder="CNH"
              keyboardType="numeric"
              value={driveLicense}
              onChangeText={setDriveLicense}
            />
          </Form>

          <Button title="proximo" onPress={handleNextStep} />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};
