import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '../../services/api';
import { colors } from '../../styles';
import {
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
import Container from '../../components/Container';

export default function Main({ navigation }) {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      const data = await AsyncStorage.getItem('@GithubUsers:users');

      if (data) {
        setUsers(JSON.parse(data));
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@GithubUsers:users', JSON.stringify(users));
  }, [users]);

  function handleNavigate(user) {
    navigation.navigate('User', { user });
  }

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

      const newUsers = [
        ...users.filter(user => user.login !== data.login),
        data,
      ];

      setUsers(newUsers);
      setNewUser('');

      Keyboard.dismiss();
    } catch (error) {
      Alert.alert('Usuário não encontrado');
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
        <SubmitButton onPress={handleAddUser} loading={loading}>
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

            <ProfileButton onPress={() => handleNavigate(item)}>
              <ProfileButtonText>Ver Perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

Main.navigationOptions = {
  title: 'Usuários',
};
