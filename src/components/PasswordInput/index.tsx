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
  value?: string;
}

export const PasswordInput = ({ iconName, value, ...rest }: Props) => {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    setIsFilled(!!value);
  };

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>
      <InputText
        {...rest}
        autoCorrect={false}
        isFocused={isFocused}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        secureTextEntry={isPasswordVisible}
      />

      <ChangePasswordVisibilityButton
        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        <IconContainer isFocused={isFocused}>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={
              isFocused || isFilled
                ? theme.colors.main
                : theme.colors.text_detail
            }
          />
        </IconContainer>
      </ChangePasswordVisibilityButton>
    </Container>
  );
};
