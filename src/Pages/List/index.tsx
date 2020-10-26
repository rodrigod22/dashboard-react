import React, { useMemo, useState, useEffect } from 'react'
import ContentHeader from './../../components/ContentHeader/index';
import SelectInput from './../../components/SelectInput/index';
import HistoryFinanceCard from './../../components/HistoryFinanceCard/index';
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import formatyCurrency from './../../utils/formatCurrency';
import formatyDate from './../../utils/formatDate';
import listOfMonths from '../../utils/months';
import {
  Container,
  Content,
  Filters
} from './styles';

interface IRouteParams {
  match: {
    params: {
      type: string
    }
  }
}

interface IData {
  description: string;
  amountFormatted: string;
  frequency: string;
  dateFormatted: string;
  tagColor: string;
}

const List: React.FC<IRouteParams> = ({ match }) => {

  const [data, setData] = useState<IData[]>([])
  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
  const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual']);

  const { type } = match.params;

  const pageData = useMemo(() => {
    return type === 'entry-balance' ?
      { title: 'Entradas', lineColor: '#4E41F0', data: gains } :
      { title: 'Saidas', lineColor: '#E44C4F', data: expenses }
  }, [type])

  useEffect(() => {

    const filteredData = pageData.data.filter(item => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return month === monthSelected && year === yearSelected
        && selectedFrequency.includes(item.frequency);
    });

    const formattedData = filteredData.map(item => {

      return {
        description: item.description,
        amountFormatted: formatyCurrency(Number(item.amount)),
        frequency: item.frequency,
        dateFormatted: formatyDate(item.date),
        tagColor: item.frequency === 'recorrente' ? "#4E41F0" : "#E44C$E"
      }
    });

    setData(formattedData);

  }, [pageData.data, monthSelected, yearSelected, selectedFrequency]);

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

    pageData.data.forEach(item => {
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

  }, [pageData.data])

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(item => item === frequency);

    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter(item => item !== frequency)
      setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency((prev) => [...prev, frequency])
    }
  }

  const handleMonthSelected = (month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error('Valor inválido para o mês')
    }
  }

  const handleYearSelected = (year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
      throw new Error('Valor inválido para o ano')
    }
  }

  return (
    <Container>
      <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
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

      <Filters>
        <button
          type="button"
          className={`tag-filter tag-filter-recurrent 
           ${selectedFrequency.includes('recorrente') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className={`tag-filter tag-filter-eventual
          ${selectedFrequency.includes('eventual') && 'tag-actived'}`}
          onClick={() => handleFrequencyClick('eventual')}
        >
          Eventuais
        </button>

      </Filters>

      <Content>
        {
          data.map((item, index) => (
            <HistoryFinanceCard
              key={index}
              title={item.description}
              subTitle={item.dateFormatted}
              tagColor={item.frequency === 'recorrente'
                ? '#4E41F0'
                : '#E44C4E'
              }
              amount={item.amountFormatted}
            />
          ))
        }
      </Content>
    </Container>
  )
}

export default List;