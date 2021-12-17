import React, { useState } from "react";
import { useTheme } from "styled-components";
import { Feather } from "@expo/vector-icons";
import {
  Container,
  IconContainer,
  InputText,
  ChangePasswordVisibilityButton
} from "./styles";
import { TextInputProps } from "react-native";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export const PasswordInput = ({ iconName, ...rest }: Props) => {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>
      <InputText {...rest} secureTextEntry={isPasswordVisible} />

      <ChangePasswordVisibilityButton
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <IconContainer>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </ChangePasswordVisibilityButton>
    </Container>
  );
};
