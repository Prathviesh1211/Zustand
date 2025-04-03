import { Box, Container, Typography } from "@mui/material";
import useHabitStore from "./store/store";
import AddHabit from "./components/AddHabit";
import ListHabit from "./components/ListHabit";
import { useEffect } from "react";

export default function App() {
  const store=useHabitStore()  
  console.log(store);
  const {fetchHabits}=useHabitStore();
    useEffect(()=>{
      fetchHabits();
    },[])
  return (
      
      <Container>
        <Box>
          <Typography variant="h1" component='h2' gutterBottom align="center">
            Habit Tracker
          </Typography>

          {/* FORM */}
          <AddHabit></AddHabit>
          {/* LIST */}
          <ListHabit></ListHabit>
          {/* STATS */}
        </Box>
      </Container>
    );
  }
  