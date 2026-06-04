/*
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
*/

import { useState } from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

const users = [
  {
    userName: 'midudev',
    name: 'Miguel Ángel Durán',
    isFollowing: true
  },
  {
    userName: 'pheralb',
    name: 'Pablo H.',
    isFollowing: false
  },
  {
    userName: 'Gonzalo-Choque',
    name: 'Gonzalo Choque',
    isFollowing: true
  }
]

export function App () {
  const [state, setState] = useState(0)

  return (
    <section className='App'>
      {
        users.map(({userName, name, isFollowing}) => (
            <TwitterFollowCard
              key={userName}
              userName={userName}
              initialIsFollowing={isFollowing}
            >
              {name}
            </TwitterFollowCard>
          )
        )
      }
      <button onClick={()=>setState(state+1)}>count {state}</button>
    </section>
  )
}

//export default App
