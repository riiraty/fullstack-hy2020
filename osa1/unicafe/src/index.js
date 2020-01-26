import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Statistics = (props) => {
    const all = props.good + props.neutral + props.bad

    let average = 0;
    let positive = 0;

    if (all > 0) {
        average = (((props.good*1)+(props.bad*(-1)))/all)
        positive = props.good / all
    }

    return (
        <>
          all {all} <br/>
          average {average} <br/>
          positive {positive} %<br/>
        </>
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
        <p>
            good {good} <br/>
            neutral {neutral} <br/>
            bad {bad} <br/>
            <Statistics good={good} neutral={neutral} bad={bad} />
        </p>
      </div>
    )
  }
  
  ReactDOM.render(<App />, 
    document.getElementById('root')
  )