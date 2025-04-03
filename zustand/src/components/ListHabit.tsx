import { Box, Button, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useHabitStore, { Habit } from '../store/store'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { idID } from '@mui/material/locale';


const ListHabit = () => {
  const {habits,removeHabit,toggleHabit}=useHabitStore();
  const today=new Date().toISOString().split('T')[0];


  const getStreak=(habit:Habit)=>{
    let streak=0;
    const currentDate=new Date(); 

    while(true){
      const dateString=currentDate.toISOString().split('T')[0];
      if(habit.completedDates.includes(dateString)){
        streak++;
        currentDate.setDate(currentDate.getDate()-1)
      }else{
        break;
      }

    }
    return streak;


  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4 }}>
      {habits.map((habit) => (
        <Paper key={habit.id} elevation={2} sx={{p:2}}>
          <Grid container alignItems='center' spacing={2} sx={{display:'flex',justifyContent:'space-between'}}>
            <Grid item xs={12} sm={6} > {/* ✅ Fixed Grid issue */}
              <Typography variant="h6">{habit.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {habit.frequency}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}> {/* ✅ Fixed Grid issue */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button variant="outlined" color={habit.completedDates.includes(today)?
                    'success':
                    'primary'}
                    onClick={()=>toggleHabit(habit.id,today)}
                    startIcon={<CheckCircleIcon/>}>
                  {habit.completedDates.includes(today)?
                    'Completed':
                    'Mark completed'}
                </Button>
                <Button variant="outlined" color="error" startIcon={<DeleteIcon/>} onClick={()=>removeHabit(habit.id)}>Remove</Button>
              </Box>
            </Grid>
          </Grid>

          {/* Stats */}
          <Box sx={{mt:2}}>
            <Typography>Current Streak : {getStreak(habit)}</Typography>
            <LinearProgress variant="determinate" value={(getStreak(habit)/30)*100} />
          </Box>
        </Paper>
      ))}
    </Box>
  )
}

export default ListHabit
