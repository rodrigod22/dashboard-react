import React, { useState, useMemo } from 'react'
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMonths from '../../utils/months';
import WalletBox from '../../components/WalletBox';

import {
  Container,
  Content
} from './styles';



const Dashboad: React.FC = () => {

  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

  const options = [
    { value: 'Rodrigo', label: 'Rodrigo' },
    { value: 'Juan', label: 'Juan' },
    { value: 'Michele', label: 'Michele' },
  ]

  const months = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month
      }
    })
  }, []);

  const years = useMemo(() => {
    let uniqueYears: number[] = [];

    [...expenses, ...gains].forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year)
      }
    });

    return uniqueYears.map(year => {
      return {
        value: year,
        label: year
      }
    });

  }, [])

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch (error) {
      throw new Error('Valor inválido para o mês')
    }
  }

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setMonthSelected(parseYear);
    } catch (error) {
      throw new Error('Valor inválido para o ano')
    }
  }

  return (
    <Container>
      <ContentHeader title="DASHBOARD" lineColor="#F7931B">
        <SelectInput
          options={months}
          onChange={e => handleMonthSelected(e.target.value)}
          defaultValue={monthSelected}
        />
        <SelectInput
          options={years}
          onChange={e => handleYearSelected(e.target.value)}
          defaultValue={yearSelected} />
      </ContentHeader>
      <Content>
        <WalletBox
          title="saldo"
          amount={150}
          footerLabel="Atualizado"
          color="#4E41F0"
          icon="dolar"
        />
        <WalletBox
          title="Entradas"
          amount={5000.00}
          footerLabel="Atualizado"
          color="#4E41F0"
          icon="arrowUp"
        />
        <WalletBox
          title="Saidas"
          amount={4500.00}
          footerLabel="Atualizado"
          color="#4E41F0"
          icon="arrowDown"
        />
      </Content>

    </Container>
  )
}

export default Dashboad;