import React, { useState } from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import { colors } from '../../styles';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

export default function Main() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleAddUser() {
    setLoading(true);

    try {
      const { data: response } = await api.get(`/users/${newUser}`);

      const data = {
        name: response.name,
        login: response.login,
        bio: response.bio,
        avatar: response.avatar_url,
      };

      setUsers([...users, data]);
      setNewUser('');

      Keyboard.dismiss();
    } catch (error) {
      console.tron.error(error);
    }

    setLoading(false);
  }

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar Usuário"
          value={newUser}
          onChangeText={setNewUser}
          onSubmitEditing={handleAddUser}
          returnKeyType="send"
        />
        <SubmitButton onPress={handleAddUser}>
          {loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <Icon name="add" size={20} color={colors.white} />
          )}
        </SubmitButton>
      </Form>

      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton onPress={() => {}}>
              <ProfileButtonText>Ver Perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Usuários',
};
