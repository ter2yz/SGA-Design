import Map from './components/Map'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="relative w-full h-screen flex justify-center items-center">
        <div className="container">
          <div className="w-full flex flex-row-reverse justify-center">
            <div className="w-1/2">
              <div className="w-full mt-10 px-10">
                <h1 className="text-gray-800 font-bold text-5xl leading-none uppercase">
                  <span className="">What we did</span>
                  <span className="block ">in these days</span>
                </h1>
                <p className="text-gray-800 mt-5">
                  SGA put human experience as the base of design. We respect, collect, observe and analyse client’s experience, and make them the fundamental data when creating customised design solutions.
                </p>
                <p className="text-gray-800 mt-3">
                  SGA put human experience as the base of design. We respect, collect, observe and analyse client’s experience, and make them the fundamental data when creating customised design solutions.
                </p>
              </div>
            </div>
            <div className="w-6/12 h-[80vh] rounded-lg overflow-hidden shadow-lg">
              <Map />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen bg-purple-500"></div>
      <div className="w-full h-screen bg-purple-800"></div>
    </div>
  );
}

export default App;
