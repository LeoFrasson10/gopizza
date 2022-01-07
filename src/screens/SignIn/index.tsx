import React, { useState } from "react";

import { KeyboardAvoidingView, Platform } from "react-native";

import { useAuth } from "@hooks/auth";

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import brandImg from "@assets/brand.png";

import {
  Container,
  Content,
  Title,
  Brand,
  ForgotPasswordButton,
  ForgotPasswordLabel,
} from "./styles";

export function SignIn() {
  const { isLogging, signIn, forgotPassword } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    signIn(email, password);
  }

  function handleForgotPassword() {
    forgotPassword(email);
  }

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content>
          <Brand source={brandImg} />

          <Title>Login</Title>

          <Input
            type="secondary"
            placeholder="E-mail"
            autoCorrect={false}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(text) => setEmail(text)}
          />
          <Input
            type="secondary"
            placeholder="Senha"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />

          <ForgotPasswordButton onPress={handleForgotPassword}>
            <ForgotPasswordLabel>Esqueci minha senha</ForgotPasswordLabel>
          </ForgotPasswordButton>

          <Button
            type="secondary"
            title="Entrar"
            isLoading={isLogging}
            onPress={handleSignIn}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
}
