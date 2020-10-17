import React from 'react'
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';

import {
  Container
} from './styles';


const Dashboad: React.FC = () => {


  const options = [
    { value: 'Rodrigo', label: 'Rodrigo' },
    { value: 'Juan', label: 'Juan' },
    { value: 'Michele', label: 'Michele' },
  ]

  return (
    <Container>
      <ContentHeader title="DASHBOARD" lineColor="#F7931B">
        <SelectInput options={options} onChange={() => { }} />
      </ContentHeader>
    </Container>
  )
}

export default Dashboad;