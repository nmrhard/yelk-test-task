import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TrackDetails } from './components/TrackDetails';
import { ArtistList } from './components/ArtistList';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ArtistList />} />
        <Route path='/track/:id' element={<TrackDetails />} />
        <Route path='*' element={<h1>Not found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
