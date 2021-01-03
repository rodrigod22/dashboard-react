import React, { useMemo, useState } from 'react'
import Toggle from '../Toogle';

import Emojis from '../../utils/emojis';
import { useTheme } from '../../hooks/theme';
import {
  Container,
  Profile,
  Welcome,
  UserName,
} from './styles';

const MainHeader: React.FC = () => {

  const { toggleTheme, theme } = useTheme();

  const [darkTheme, setDarkTheme] = useState(() => theme.title === 'dark' ? true : false);

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme)
    toggleTheme();
  }

  const emoji = useMemo(() => {
    const indice = Math.floor(Math.random() * Emojis.length);
    return Emojis[indice];
  }, []);

  return (
    <Container>
      <Toggle
        labelLeft="Light"
        labelRight="Dark"
        checked={darkTheme}
        onChange={handleChangeTheme}
      />
      <Profile>
        <Welcome>Ola, {emoji}</Welcome>
        <UserName>Rodrigo Peixoto</UserName>
      </Profile>
    </Container>
  )
}

export default MainHeader;