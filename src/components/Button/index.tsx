import React from "react";
import { TouchableOpacityProps } from "react-native";

import { Container, Load, Title, TypeProps } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
  type?: TypeProps;
  isLoading?: boolean;
};

export function Button({
  title,
  type = "primary",
  isLoading = false,
  ...rest
}: Props) {
  return (
    <Container {...rest} type={type} disabled={isLoading}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  );
}
