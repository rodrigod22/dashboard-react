import React from 'react';


import {
  Container,
  ToggleLabel,
  ToggleSelector
} from './styles';

const Toogle: React.FC = () => (
  <Container>
    <ToggleLabel>Light</ToggleLabel>
    <ToggleSelector
      checked
      uncheckedIcon={false}
      checkedIcon={false}
      onChange={() => { console.log('mudou') }}

    />
    <ToggleLabel>Dark</ToggleLabel>
  </Container>
);

export default Toogle;