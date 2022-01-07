import React from "react";
import { useTheme } from "styled-components/native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { TouchableOpacityProps } from "react-native";
import { Container } from "./styles";

export function ButtonBack({ ...rest }: TouchableOpacityProps) {
  const { COLORS } = useTheme();
  return (
    <Container {...rest}>
      <Icon name="chevron-left" size={18} color={COLORS.TITLE} />
    </Container>
  );
}
