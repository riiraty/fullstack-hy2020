import React from 'react';

const Header = (props) => {
    return <h2>{props.course}</h2>
  }
  
  const Part = (props) => {
    return <p>{props.part.name} {props.part.exercises} </p>
  }
  
  const Content = (props) => {
    return (
      <>
        {props.parts.map((part, i) => <Part key={props.parts[i].id} part={part} />)}
      </>
    )
  }
  
  const Total = ({parts}) => {
    const sum = parts.reduce((total, add) =>  total + add.exercises, 0)
  
    return <b>Total number of exercises {sum} </b>
  }
  
  const Course = (props) => {
    return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts}/>  
      <Total parts={props.course.parts} />
    </div>
    )
  }

export default Course