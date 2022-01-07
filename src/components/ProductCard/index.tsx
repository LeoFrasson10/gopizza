import React from "react";
import { TouchableOpacityProps } from "react-native";
import { useTheme } from "styled-components/native";
import Icon from "@expo/vector-icons/Feather";
import {
  Container,
  Content,
  Image,
  Details,
  Name,
  Identification,
  Description,
  Line,
} from "./styles";

export type ProductProps = {
  id: string;
  name: string;
  description: string;
  photo_url: string;
};

type Props = TouchableOpacityProps & {
  data: ProductProps;
};

export function ProductCard({ data, ...rest }: Props) {
  const { COLORS } = useTheme();
  return (
    <Container>
      <Content {...rest}>
        <Image source={{ uri: data.photo_url }} />

        <Details>
          <Identification>
            <Name>{data.name}</Name>
            <Icon name="chevron-right" size={18} color={COLORS.SHAPE} />
          </Identification>

          <Description>{data.description}</Description>
        </Details>
      </Content>
      <Line />
    </Container>
  );
}
