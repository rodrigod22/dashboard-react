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
  const [monthSelected, setMonthSelected] = useState<string>(String(new Date().getMonth() + 1));
  const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear()));
  const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual']);

  const { type } = match.params;

  const title = useMemo(() => {
    return type === 'entry-balance' ?
      { title: 'Entradas', lineColor: '#F7931B' } :
      { title: 'Saidas', lineColor: '#E44C4F' }
  }, [type])


  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses;
  }, [type])


  useEffect(() => {

    const filteredData = listData.filter(item => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());
      // console.log(month)
      // console.log(monthSelected)
      // console.log(year)
      return month === monthSelected && year === yearSelected;

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

  }, [listData, monthSelected, yearSelected]);

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

    listData.forEach(item => {
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

  }, [listData])

  const handleFrequencyClick = (frequency: string) => {
    const alreadySelected = selectedFrequency.findIndex(item => item === frequency);

    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter(item => item !== frequency)
      setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency((prev) => [...prev, frequency])
    }
  }

  return (
    <Container>
      <ContentHeader title={title.title} lineColor={title.lineColor}>
        <SelectInput options={months} onChange={e => setMonthSelected(e.target.value)} defaultValue={monthSelected} />
        <SelectInput options={years} onChange={e => setYearSelected(e.target.value)} defaultValue={yearSelected} />
      </ContentHeader>

      <Filters>
        <button
          type="button"
          className="tag-filter tag-filter-recurrent"
          onClick={() => handleFrequencyClick('recorrente')}
        >
          Recorrentes
        </button>
        <button
          type="button"
          className="tag-filter tag-filter-eventual"
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