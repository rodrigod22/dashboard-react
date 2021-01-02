import React from 'react';


import {
  Container,
  ToggleLabel,
  ToggleSelector
} from './styles';

interface IToogleProps {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  onChange(): void;
}

const Toogle: React.FC<IToogleProps> = ({
  labelLeft, labelRight, checked, onChange
}) => (
  <Container>
    <ToggleLabel>{labelLeft}</ToggleLabel>
    <ToggleSelector
      checked={checked}
      uncheckedIcon={false}
      checkedIcon={false}
      onChange={onChange}
    />
    <ToggleLabel>{labelRight}</ToggleLabel>
  </Container>
);

export default Toogle;