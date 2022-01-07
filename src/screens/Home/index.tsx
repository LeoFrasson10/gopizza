import React, { useState, useCallback } from "react";
import firestore from "@react-native-firebase/firestore";
import { Alert, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialIcons";
import happyEmoji from "@assets/happy.png";

import { Search } from "@components/Search";
import { ProductCard, ProductProps } from "@components/ProductCard";

import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingText,
  MenuHeader,
  MenuItemsNumber,
  Title,
  NewProductButton,
} from "./styles";
import { useTheme } from "styled-components/native";

export function Home() {
  const { COLORS } = useTheme();
  const navigation = useNavigation();
  const [pizzas, setPizzas] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");

  function fetchPizzas(value: string) {
    const formattedValue = value.toLowerCase().trim();

    firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        }) as ProductProps[];
        setPizzas(data);
      })
      .catch(() => {
        Alert.alert("Erro", "Não foi possível carregar as pizzas");
      });
  }

  function handleSearch() {
    fetchPizzas(search);
  }

  function handleSearchClear() {
    setSearch("");
    fetchPizzas("");
  }

  function handleOpen(id: string) {
    navigation.navigate("product", { id });
  }

  function handleAddProduct() {
    navigation.navigate("product", {});
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas("");
    }, [])
  );

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmoji} />
          <GreetingText>Olá, Admin</GreetingText>
        </Greeting>

        <TouchableOpacity>
          <Icon name="logout" color={COLORS.TITLE} size={24} />
        </TouchableOpacity>
      </Header>
      <Search
        onSearch={handleSearch}
        onClear={handleSearchClear}
        onChangeText={setSearch}
        value={search}
      />
      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>{pizzas.length} pizzas</MenuItemsNumber>
      </MenuHeader>
      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard data={item} onPress={() => handleOpen(item.id)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 125,
          marginHorizontal: 24,
        }}
      />
      <NewProductButton
        title="Cadastrar Pizza"
        type="secondary"
        onPress={handleAddProduct}
      />
    </Container>
  );
}
