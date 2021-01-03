import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type IInputProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<IInputProps> = ({ children, ...rest }) => (
  <Container {...rest} >
    {children}
  </Container>
);

export default Button;