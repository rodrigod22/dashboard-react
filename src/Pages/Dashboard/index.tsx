import React, { useState, useMemo, useCallback } from 'react'
import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import gains from '../../repositories/gains';
import expenses from '../../repositories/expenses';
import listOfMonths from '../../utils/months';
import WalletBox from '../../components/WalletBox';

import grinningImg from '../../assets/grinning.svg';
import happyImg from '../../assets/happy.svg';
import sadImg from '../../assets/sad.svg';
import thinkingImg from '../../assets/thinking.svg';

import {
  Container,
  Content
} from './styles';
import MensageBox from '../../components/MensageBox';
import PieChartBox from '../../components/PieChartBox';
import HistoryBox from './../../components/HistoryBox/index';
import BarChartBox from '../../components/BarChartBox';



const Dashboad: React.FC = () => {

  const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
  const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

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

  const totalExpenses = useMemo(() => {
    let total: number = 0;

    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;


      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch {
          throw new Error('Valor invalido')
        }
      }
    })

    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total: number = 0;

    gains.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount)
        } catch {
          throw new Error('Valor invalido')
        }
      }
    })
    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: "Que triste!",
        description: "Nesta mês, você gastou mais do que deveria.",
        footerText: "Verifique seus gastos e tente cortar algumas coisa desnecessariass",
        icon: sadImg
      }
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Ops!",
        description: "Nesta mês, não há registros de entradas ou saídas.",
        footerText: "Parece que você não fez nenhum registro no mês e ano selecionado",
        icon: thinkingImg
      }
    }
    else if (totalBalance === 0) {
      return {
        title: "Ufaa!",
        description: "Nesta mês, você gastou exatamenteo que ganhou.",
        footerText: "Tenha cuidado. No próximo mês tente poupar o seu dinheiro",
        icon: grinningImg
      }
    } else {
      return {
        title: "Muito bem!",
        description: "Sua carteira esta positiva.",
        footerText: "Continue assim. Considere investir o seu saldo",
        icon: happyImg
      }
    }

  }, [totalBalance, totalGains, totalExpenses])

  const relationExpensesGains = useMemo(() => {

    const total = totalGains + totalExpenses;

    const persentsGains = Number(((totalGains / total) * 100).toFixed(1))

    const percentsExpenses = Number(((totalExpenses / total) * 100).toFixed(1))

    const data = [
      {
        name: "Entradas",
        value: totalGains,
        percent: persentsGains ? persentsGains : 0,
        color: "#F7931B"
      },
      {
        name: "Saídas",
        value: totalExpenses,
        percent: percentsExpenses ? percentsExpenses : 0,
        color: "#E44C4E"
      },
    ]

    return data;

  }, [totalGains, totalExpenses]);

  const historyData = useMemo(() => {

    return listOfMonths.map((_, month) => {

      let amountEntry = 0;
      gains.forEach(gain => {
        const date = new Date(gain.date);
        const gainMounth = date.getMonth();
        const gainYear = date.getFullYear();

        if (gainMounth === month && gainYear === yearSelected) {
          try {
            amountEntry += Number(gain.amount);
          } catch {
            throw new Error('Valor inválido entre com um numero')
          }
        }
      });

      let amountOutput = 0;
      expenses.forEach(expense => {
        const date = new Date(expense.date);
        const expenseMounth = date.getMonth();
        const expenseYear = date.getFullYear();

        if (expenseMounth === month && expenseYear === yearSelected) {
          try {
            amountOutput += Number(expense.amount);
          } catch {
            throw new Error('Valor inválido entre com um numero')
          }
        }
      });

      return {
        monthNumber: month,
        month: listOfMonths[month].substr(0, 3),
        amountEntry,
        amountOutput
      }

    })
      .filter(item => {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        return (yearSelected === currentYear && item.monthNumber <= currentMonth) || (yearSelected < currentYear)
      });



  }, [yearSelected])


  const relationExpensesRecurrentVersusAtual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses.filter((expense) => {
      const date = new Date(expense.date);
      const year = date.getFullYear();
      const month = date.getMonth();

      return month === monthSelected && year === yearSelected;
    })
      .forEach((expense) => {
        if (expense.frequency === 'recorrente') {
          return amountRecurrent += Number(expense.amount)
        }

        if (expense.frequency === 'eventual') {
          return amountEventual += Number(expense.amount)
        }
      });

    const total = amountEventual + amountRecurrent;

    const recurrentPercent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: '#F7931B'
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: '#E44C4E'
      }
    ];
  }, [monthSelected, yearSelected]);



  const relationGainsRecurrentVersusAtual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains.filter((gain) => {
      const date = new Date(gain.date);
      const year = date.getFullYear();
      const month = date.getMonth();

      return month === monthSelected && year === yearSelected;
    })
      .forEach((gain) => {
        if (gain.frequency === 'recorrente') {
          return amountRecurrent += Number(gain.amount)
        }

        if (gain.frequency === 'eventual') {
          return amountEventual += Number(gain.amount)
        }
      });

    const total = amountEventual + amountRecurrent;

    const recurrentPercent = Number(((amountRecurrent / total) * 100).toFixed(1));
    const eventualPercent = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: recurrentPercent ? recurrentPercent : 0,
        color: '#F7931B'
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: eventualPercent ? eventualPercent : 0,
        color: '#E44C4E'
      }
    ];
  }, [monthSelected, yearSelected]);

  const handleMonthSelected = useCallback((month: string) => {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error('Valor inválido para o mês')
    }
  }, []);

  const handleYearSelected = useCallback((year: string) => {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
      throw new Error('Valor inválido para o ano')
    }
  }, [])

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
          amount={totalBalance}
          footerLabel="Atualizado com base nas entradas e saidas"
          color="#4E41F0"
          icon="dolar"
        />
        <WalletBox
          title="Entradas"
          amount={totalGains}
          footerLabel="Atualizado"
          color="#F7931B"
          icon="arrowUp"
        />
        <WalletBox
          title="Saidas"
          amount={totalExpenses}
          footerLabel="Atualizado"
          color="#E44C4E"
          icon="arrowDown"
        />

        <MensageBox
          title={message.title}
          description={message.description}
          footerText={message.footerText}
          icon={message.icon}
        />

        <PieChartBox data={relationExpensesGains} />

        <HistoryBox
          data={historyData}
          lineColorAmountEntry="#F7931B"
          lineColorAmountOutput="#E44C4E"
        />

        <BarChartBox
          data={relationGainsRecurrentVersusAtual}
          title="Entradas"
        />

        <BarChartBox
          data={relationExpensesRecurrentVersusAtual}
          title="Saídas"
        />




      </Content>

    </Container >
  )
}

export default Dashboad;