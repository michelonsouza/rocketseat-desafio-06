import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

import api from '../../services/api';
import { colors } from '../../styles';

import {
  LoadingContainer,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
} from './styles';
import Container from '../../components/Container';

export default function User({ navigation }) {
  const user = navigation.getParam('user');
  const [stars, setStars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function loadStars() {
      const { data: response } = await api.get(
        `/users/${user.login}/starred?page=${page}`,
      );

      setStars(response);
      setLoading(false);
    }

    loadStars();
  }, []);

  async function loadData(refresh = false) {
    if (refresh) {
      setRefreshing(true);
    }

    const { data: response } = await api.get(
      `/users/${user.login}/starred?page=${refresh ? 1 : page + 1}`,
    );

    setStars(refresh ? response : [...stars, ...response]);
    setPage(refresh ? 1 : page + 1);
    setRefreshing(false);
  }

  /* eslint-disable */
  function renderStarred({ item }) {
    return (
      <Starred
        onPress={() => navigation.navigate('Repository', { repository: item })}>
        <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
        <Info>
          <Title>{item.name}</Title>
          <Author>{item.owner.login}</Author>
        </Info>
      </Starred>
    );
  }
  /* eslint-enable */

  if (loading) {
    return (
      <LoadingContainer>
        <ActivityIndicator size="large" color={colors.dark} />
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Avatar source={{ uri: user.avatar }} />
        <Name>{user.name}</Name>
        <Bio>{user.bio}</Bio>
      </Header>

      <Stars
        data={stars}
        keyExtractor={star => String(star.id)}
        renderItem={renderStarred}
        onEndReachedThreshold={0.2}
        onEndReached={() => loadData()}
        refreshing={refreshing}
        onRefresh={() => loadData(true)}
        ListFooterComponent={
          <ActivityIndicator size="large" color={colors.darken} />
        }
      />
    </Container>
  );
}

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
};

User.navigationOptions = ({ navigation: { getParam } }) => ({
  title: getParam('user').name,
});
