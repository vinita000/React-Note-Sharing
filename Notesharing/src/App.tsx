import { Grid } from '@material-ui/core'
import NoteApp from './components/NoteApp'

function App() {
  return (
    <div>
      <Grid align='center'>
        <h1>Note Sharing App</h1>
        <NoteApp />
      </Grid>
    </div>
  )
}

export default App
