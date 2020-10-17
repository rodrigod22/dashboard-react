import styled from 'styled-components';

interface IContainerProps {
  color: string;
}

export const Container = styled.div`
  background-color: ${props => props.color}
`;