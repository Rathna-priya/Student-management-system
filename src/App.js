import logo from "./logo.svg";
import "./App.css";
import supabase from "./config/supabase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Create from "./screens/Create";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import Update from "./screens/Update";
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Container sx={{marginTop:5}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/:id" element={<Update/>}/>
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
