import Navbar from './Navbar';
import Footer from './Footer';
import Board from './Board';
import Turn from './Turn';
import { useState } from 'react';

function App() {
    // TODO make dependent on playerID
    const [turn, setTurn] = useState(true);
    return (
        <div className="App">
            <Navbar />
            <div className="grid grid-cols-[1fr_3fr_1fr] py-16">
                <Turn turn={turn} />
                <Board turn={turn} switchTurn={setTurn} />
                <Turn turn={turn} />
            </div>
            <Footer />
        </div>
    );
}

export default App;
