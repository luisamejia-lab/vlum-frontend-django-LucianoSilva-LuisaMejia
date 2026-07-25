import { Container } from "@mui/material";
import Header from "./components/Header";
import MovieList from "./pages/MovieList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieForm from "./components/MovieForm";
import DirectorForm from "./components/DirectorForm";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import DirectorList from "./pages/DirectorList";
import MovieDetail from "./pages/MovieDetail";
import DirectorDetail from "./pages/DirectorDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Container sx={{ mt: 8, mb: 4 }}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<MovieList />} />
          <Route path="/directors" element={<DirectorList />} />
          <Route path="/add-movie" element={<MovieForm />} />
          <Route path="/add-director" element={<DirectorForm />} />
          <Route path="/edit-movie/:id" element={<MovieForm />} />
          <Route path="/edit-director/:id" element={<DirectorForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/directors/:id" element={<DirectorDetail />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
