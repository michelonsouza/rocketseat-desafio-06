import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { colors } from '../../styles';

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: ${colors.light};
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.lighten,
})`
  flex: 1;
  height: 40px;
  background: ${colors.light};
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid ${colors.light};
`;

export const SubmitButton = styled(RectButton)`
  background: ${colors.primary};
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  height: 40px;
  border-radius: 4px;
  margin-left: 10px;
  opacity: ${({ loading }) => (loading ? 0.7 : 1)};
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 20px;
`;

export const User = styled.View`
  align-items: center;
  margin: 0 0 20px;
  border: 1px solid ${colors.primary};
  border-radius: 4px;
  padding: 10px;
`;

export const Avatar = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: ${colors.light};
`;

export const Name = styled.Text`
  font-size: 14px;
  color: ${colors.dark};
  font-weight: bold;
  margin-top: 4px;
  text-align: center;
`;

export const Bio = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 13px;
  line-height: 18px;
  color: ${colors.lighten};
  margin-top: 5px;
  text-align: center;
`;

export const ProfileButton = styled(RectButton)`
  margin-top: 10px;
  align-self: stretch;
  border-radius: 4px;
  background: ${colors.primary};
  justify-content: center;
  align-items: center;
  height: 36px;
`;

export const ProfileButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${colors.white};
  text-transform: uppercase;
`;
