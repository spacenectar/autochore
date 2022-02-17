import { useState, useContext, useEffect } from 'react';
import { Container, Paper, Typography} from '@mui/material'

/** Import components */
import ChoresList from '../components/chores-list';
import ChoreForm from '../components/chore-form';

/** Import types */
import { Month } from '../types/month';
import { Chore } from '../types/chore';
import MainTemplate from './templates/main';
import ModeContext from './contexts/mode-context';

const apiRoot = `${process.env.NEXT_PUBLIC_APP_URL}/api`

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

  // Create an array of months with the month name and month number
const months: Month[] = [
  { name: 'January', number: 1, days: 31 },
  { name: 'February', number: 2, days: 28 },
  { name: 'March', number: 3, days: 31 },
  { name: 'April', number: 4, days: 30},
  { name: 'May', number: 5, days: 31 },
  { name: 'June', number: 6, days: 30 },
  { name: 'July', number: 7, days: 31 },
  { name: 'August', number: 8, days: 31 },
  { name: 'September', number: 9, days: 31 },
  { name: 'October', number: 10, days: 30 },
  { name: 'November', number: 11, days: 31 },
  { name: 'December', number: 12, days: 31 }
]

const postToDatabase = async (newChore: Chore, existingChore?:string) => {

  const endpoint = existingChore ? `/edit-chore/${existingChore}` : '/add-chore'

  try {
    const response = await fetch(`${apiRoot}/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(newChore),
    })
  
    const data = await response.json()
    
    if (data.success) {
      alert(`Chore ${existingChore ? 'added' : 'updated'} successfully`)
    }

    return 'success';
  } catch (error) {
    console.error(error)
    return 'error'
  }  

}

export default function Home({chores, users}) {

  const { mode, setMode } = useContext(ModeContext)

  const [choresList, setChoresList] = useState<Chore[]>(chores)

  const updateChoresList = async (newChore: Chore, existingChore?:string) => {
    const response = await postToDatabase(newChore, existingChore)
    if (response === 'success') {
      setChoresList(choresList.concat(newChore))
    }
  }

  return (
    <MainTemplate>
      <ModeContext.Consumer>
        {({mode}) => (
          <>
      {
        mode === 'view' && <>
        <Typography variant="h2" component="div" gutterBottom>
          Existing Chores
        </Typography>
        <ChoresList chores={choresList} users={users} />
      </>
      }
      {
        mode === 'add' && <>
        <Typography variant="h2" component="div" gutterBottom>
          Add new chores
        </Typography>
        <Paper sx={{
          padding: '24px',
        }}> 
          <ChoreForm choresList={choresList} users={users} updateChoresList={updateChoresList} days={days} months={months} updateType='add'/>
        </Paper>
      </>
      }
      </>
        )}
      </ModeContext.Consumer>
    </MainTemplate>
  )
}

export async function getServerSideProps(_ctx) {
  
  const getData = async (endpoint: string) => {
    const response = await fetch(`${apiRoot}/${endpoint}`)
    const res = await response.json()
    return res
  }
  
  return {
    props: {
      chores: await getData('get-chores'),
      users: await getData('get-users')
    }
  }
}
