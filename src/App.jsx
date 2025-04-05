import { useState } from 'react'
import './App.css'

const App = () => {
  let totalStrength = 0;
  let totalAgility = 0
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [zombieFighters, updateZombieFighters] = useState(
    [
      {
        id: 1,
        name: 'Survivor',
        price: 12,
        strength: 6,
        agility: 4,
        img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/0c2d6b.png',
      },
      {
        id: 2,
        name: 'Scavenger',
        price: 10,
        strength: 5,
        agility: 5,
        img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/033a16.png',
      },
      {
        id: 3,
        name: 'Shadow',
        price: 18,
        strength: 7,
        agility: 8,
        img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/262c36.png',
      },
      {
        id: 4,
        name: 'Tracker',
        price: 14,
        strength: 7,
        agility: 6,
        img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/3c1e70.png',
      },
      {
        id: 5,
        name: 'Sharpshooter',
        price: 20,
        strength: 6,
        agility: 8,
        img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/4b2900.png',
      },
      {
        id: 6,
        name: 'Medic',
        price: 15,
        strength: 5,
        agility: 7,
        img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5a1e02.png',
      },
      {
        id: 7,
        name: 'Engineer',
        price: 16,
        strength: 6,
        agility: 5,
        img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/5e103e.png',
      },
      {
        id: 8,
        name: 'Brawler',
        price: 11,
        strength: 8,
        agility: 3,
        img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/67060c.png',
      },
      {
        id: 9,
        name: 'Infiltrator',
        price: 17,
        strength: 5,
        agility: 9,
        img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/ac3220.png',
      },
      {
        id: 10,
        name: 'Leader',
        price: 22,
        strength: 7,
        agility: 6,
        img: 'https://pages.git.generalassemb.ly/modular-curriculum-all-courses/react-state-management-lab/assets/e41f26.png',
      },
    ]    
  )

  // Function for button to Add Fighter to Team and Remove from Zombie Fighter Index
  const handleAddFighter = ({ zomfighter }) => {
    if (money > zomfighter.price) { // If statement logic to allow adding in a fighter
      setMoney(money - zomfighter.price)
      const addTeam = setTeam([...team, zomfighter])
      const targetZomFighter = zomfighter.id;
      updateZombieFighters([...zombieFighters.filter(zomfighter => zomfighter.id !== targetZomFighter)]); // filter passes all the objects that are in the zomfighter array with the rule to keep all BUT the one where the ID matches the targetZomFighter defined above
    } else { // Prevent 'purchase' of fighter due to lack of funds 
      console.log("Not enough money");
      return;
    }    
  }

  // Function for button to Remove Team Member from Team and Add to Zombie Fighter Index
  const handleRemoveFighter = ({ teamMember }) => {
    setMoney(money + teamMember.price)
    updateZombieFighters([...zombieFighters, teamMember])
    const targetZomFighter = teamMember.id;
    const removeTeam = setTeam([...team.filter(teamMember => teamMember.id !== targetZomFighter)])
  }


  /* Two ways built to calculate total stats of team */

  // Iteration over each member's specific object to add together
  // team.forEach((member) => {
  //   totalStrength = totalStrength + member.strength;
  //   totalAgility = totalAgility + member.agility
  // })

  // Utilization of reduce() function: loops through an array and provides an accumulation of a value based on what it's looping through:
  // Syntax:
  // 
  // Array.reduce(("Accumulator", Current Value) => {
  //  logic of what should happen
  //  return updatedAccumulator;
  // }, initialValue);
  //
  totalStrength = team.reduce((total, member) => total + member.strength, 0)
  totalAgility = team.reduce((total, member) => total + member.agility, 0)

  return (
    <>
    <h1>Reactville's Zombie Defense Team</h1>
    <h2>The Team:</h2>
    <h3>Current Funds: {money}</h3>
    <h3>Total Strength: {totalStrength}</h3>
    <h3>Total Agility: {totalAgility}</h3>
    <ul>
      {team.length === 0 ? <h3>Hire some team members below!</h3> : null}
      {team.map((teamMember) => (
        <div key={teamMember.id}>
          <li><img src={teamMember.img}></img><br/>Class: {teamMember.name}<br/> Price: {teamMember.price}<br/>Strength: {teamMember.strength}<br/>Agility: {teamMember.agility}<br/><button onClick={() => handleRemoveFighter({ teamMember })}>Remove from Team</button></li>
        </div>
      ))}
    </ul>
    <h2>List of Zombie Fighters:</h2>
    <ul>
      {zombieFighters.map((zomfighter) => (
        <div key={zomfighter.id}>
          <li><img src={zomfighter.img}></img><br/>Class: {zomfighter.name}<br/> Price: {zomfighter.price}<br/>Strength: {zomfighter.strength}<br/>Agility: {zomfighter.agility}<br/><button onClick={() => handleAddFighter({ zomfighter })}>Add to Team</button></li>
        </div>
      ))}
    </ul>
    </>
  );
}

export default App
