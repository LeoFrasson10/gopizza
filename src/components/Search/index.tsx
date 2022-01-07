import React from "react";
import { TextInputProps } from "react-native";
import { useTheme } from "styled-components/native";
import Icon from "@expo/vector-icons/Feather";

import { Container, InputArea, Input, ButtonClear, Button } from "./styles";

type Props = TextInputProps & {
  onSearch: () => void;
  onClear: () => void;
};

export function Search({ onClear, onSearch, ...rest }: Props) {
  const { COLORS } = useTheme();
  return (
    <Container>
      <InputArea>
        <Input placeholder="pesquisar..." {...rest} />

        <ButtonClear onPress={onClear}>
          <Icon name="x" size={16} />
        </ButtonClear>
      </InputArea>
      <Button onPress={onSearch}>
        <Icon name="search" size={16} color={COLORS.TITLE} />
      </Button>
    </Container>
  );
}
