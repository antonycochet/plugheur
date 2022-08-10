import React, { useState, useEffect } from 'react';
import { Autocomplete } from './components/Autocomplete';
import { ChartMeter } from './components/ChartMeter';

function App() {
  const [split, setSplit] = useState<{
    textButton: string;
    isSplited: boolean;
  }>({
    textButton: 'Split in two graphs',
    isSplited: false
  });
  const [serialValue, setSerialValue] = useState<string>('');
  const [meterData, setMeterData] = useState<{
    title: string;
    dateTime: string[];
    wh: number[];
    varh: number[];
  }>({
    title: '',
    dateTime: [],
    wh: [],
    varh: []
  });

  useEffect(() => {
    (async () => {
      if (serialValue) {
        const result = await fetch(`/serials?serial=${serialValue}`);
        const meterData = await result.json();
        setMeterData(meterData);
      }
    })();
  }, [serialValue]);

  const splitGraphs = () => {
    const textButton = split.isSplited
      ? 'Split in two graphs'
      : 'Get in one graph';

    setSplit((prevState) => ({
      ...prevState,
      textButton: textButton,
      isSplited: !split.isSplited
    }));
  };

  return (
    <div className="bg-[#243F35] h-screen">
      <div className="container mx-auto pt-8 space-y-6 px-6 lg:px-0">
        <h1 className="text-6xl font-bold text-white">PLUGHEUR</h1>
        <p className="text-white text-lg font-semibold">
          You can search for a meter and to visualize its consumption <br></br>{' '}
          for WH and VARH in a graph over time
        </p>
        <p className="text-white text-base font-normal">
          First step search your meter serial below
        </p>

        <div className="flex flex-row space-x-8">
          <Autocomplete
            serials={['METER000001', 'METER000002']}
            setSerialValue={setSerialValue}
          />
          {serialValue && (
            <button
              className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => splitGraphs()}
            >
              {split.textButton}
            </button>
          )}
        </div>

        {serialValue && (
          <ChartMeter
            isSplited={split.isSplited}
            chartData={{
              title: meterData.title,
              dateTime: meterData.dateTime,
              wh: meterData.wh,
              varh: meterData.varh
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
