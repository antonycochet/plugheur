import React, { useState, useEffect } from "react";
import { Autocomplete } from "./components/Autocomplete";
import { ChartMeter } from "./components/ChartMeter";

function App() {

  const [serialValue, setSerialValue] = useState<string>("");
  const [newServerResult, setNewServerResult] = useState<{title: string, dateTime: string[], wh: number[], varh: number[]}>({
    title: '',
    dateTime: [],
    wh: [],
    varh: []

  })

  useEffect(() => {
    (async () => {
      if(serialValue){
        const result = await fetch(`/serials?serial=${serialValue}`);
        const newServerResult = await result.json();
        setNewServerResult(newServerResult)
      }
    })();
  }, [serialValue]);

  return (
    <div className="bg-[#243F35] h-screen">
      <div className='container mx-auto pt-8 space-y-4'>
        <h1 className='text-6xl font-bold text-white'>PLUGHEUR</h1>
        <p className="text-white text-lg font-semibold">You can search for a meter and to visualize its consumption <br></br> for WH and VARH in a graph over time</p>
        <p className="text-white text-base font-normal">First step search your meter serial below</p>
        <Autocomplete serials={["METER000001","METER000002"]} setSerialValue={setSerialValue} />

        {serialValue && 
          <ChartMeter chartData={{title: newServerResult.title, dateTime: newServerResult.dateTime, wh: newServerResult.wh, varh: newServerResult.varh}} />
        }

      </div>
    </div>
  );
}

export default App;
