import reactLogo from './assets/react.svg';
import Footer from './Footer';
import Board from './Board';

function App() {
    return (
        <div className="App">
            <div className="flex border border-black mx-auto w-1/2 mt-5">
                <a
                    href="https://vitejs.dev"
                    target="_blank"
                    className="mx-auto my-3"
                >
                    <img src="/vite.svg" alt="Vite logo" />
                </a>
            </div>
            <Board></Board>
            <Footer></Footer>
        </div>
    );
}

export default App;
