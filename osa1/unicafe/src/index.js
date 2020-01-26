import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const StatisticLine = ({text, value}) => {
    return (
        <tr>
          <td>{text}</td>
          <td>{value}</td> 
        </tr>
    )
}

const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad

    let average = 0;
    let positive = 0;

    if (all === 0 ) {
        return 'No feedback given'
    }else {
        average = (((props.good*1)+(props.bad*(-1)))/all)
        positive = props.good / all * 100
        positive += ' %'
    }

    return (
        <table>  
          <tbody>         
            <StatisticLine text="good" value ={props.good} />
            <StatisticLine text="neutral" value ={props.neutral} />
            <StatisticLine text="bad" value ={props.bad} />
            <StatisticLine text="all" value ={all} />
            <StatisticLine text="average" value ={average} />
            <StatisticLine text="positive" value ={positive} />
          </tbody> 
        </table>
    )

}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    return (
      <div>
        <h1>give feedback</h1>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
        <h1>statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    )
  }
  
  ReactDOM.render(<App />, 
    document.getElementById('root')
  )