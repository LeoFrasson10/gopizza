import React, { useState, useEffect } from "react";
import { Alert, Platform } from "react-native";
import { PIZZA_TYPES } from "@utils/pizzaTypes";
import firestore from "@react-native-firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ButtonBack } from "@components/ButtonBack";
import { RadioButton } from "@components/RadioButton";
import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { ProductProps } from "@components/ProductCard";
import { OrderNavigationProps } from "@src/types/navigation";

import { useAuth } from "@hooks/auth";

import {
  Container,
  Header,
  Photo,
  Sizes,
  Form,
  Title,
  Label,
  FormRow,
  InputGroup,
  Price,
  ContentScroll,
} from "./styles";

type PizzaResponse = ProductProps & {
  price_size: {
    [key: string]: number;
  };
};

export function Order() {
  const { user } = useAuth();
  const [size, setSize] = useState("");
  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [quantity, setQuantity] = useState(0);
  const [tableNumber, setTableNumber] = useState("");
  const [sendingOrder, setSendingOrder] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  const amount = size ? pizza.price_size[size] * quantity : 0;

  function handleGoBack() {
    navigation.goBack();
  }

  function handleOrder() {
    if (!size) {
      return Alert.alert("Pedido", "Selecione o tamanho da pizza");
    }
    if (!tableNumber) {
      return Alert.alert("Pedido", "Informe o número da mesa");
    }
    if (!quantity) {
      return Alert.alert("Pedido", "Informe a quantidade");
    }

    setSendingOrder(true);

    firestore()
      .collection("orders")
      .add({
        quantity,
        amount,
        pizza: pizza.name,
        size,
        table_number: tableNumber,
        status: "Preparando",
        waiter_id: user?.id,
        image: pizza.photo_url,
      })
      .then(() => {
        navigation.navigate("home");
      })
      .catch(() => {
        Alert.alert("Erro", "Não foi possível realizar o pedido");
        setSendingOrder(false);
      });
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((response) => {
          const data = response.data() as PizzaResponse;
          setPizza(data);
        })
        .catch(() => {
          Alert.alert("Pedido", "Não foi possível carregar a pizza");
        });
    }
  }, [id]);

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ContentScroll>
        <Header>
          <ButtonBack onPress={handleGoBack} style={{ marginBottom: 108 }} />
        </Header>
        <Photo source={{ uri: pizza.photo_url }} />
        <Form>
          <Title>{pizza.name}</Title>
          <Label>Selecione o tamanho</Label>
          <Sizes>
            {PIZZA_TYPES.map((item) => (
              <RadioButton
                key={item.id}
                title={item.name}
                selected={size === item.id}
                onPress={() => setSize(item.id)}
              />
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input keyboardType="numeric" onChangeText={setTableNumber} />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType="numeric"
                onChangeText={(value) => setQuantity(Number(value))}
              />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ {amount}</Price>

          <Button
            onPress={handleOrder}
            title="Confirmar Pedido"
            isLoading={sendingOrder}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
}
