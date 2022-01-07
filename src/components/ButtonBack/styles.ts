import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY_100};
`;
