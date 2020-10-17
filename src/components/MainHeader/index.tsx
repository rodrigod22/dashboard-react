import React, { useMemo } from 'react'

import {
  Container,
  Profile,
  Welcome,
  UserName
} from './styles';
import Emojis from '../../utils/emojis';
import Toggle from '../Toogle';

const MainHeader: React.FC = () => {

  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * Emojis.length);
    return Emojis[indice];
  }, []);

  return (
    <Container>
      <Toggle />

      <Profile>
        <Welcome>Ola, {emoji}</Welcome>
        <UserName>Rodrigo Peixoto</UserName>
      </Profile>
    </Container>
  )
}

export default MainHeader;