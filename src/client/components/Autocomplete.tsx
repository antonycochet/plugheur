import React, { useState } from 'react';

interface autocompleteProps {
  serials: string[];
  setSerialValue: (value: string) => void;
}

export const Autocomplete = ({
  serials,
  setSerialValue
}: autocompleteProps) => {
  const [filtered, setFiltered] = useState<string[]>([]);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  const serialOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    const newFilteredSuggestions = serials.filter(
      (serial) => serial.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    setInput(e.currentTarget.value);
  };

  const serialClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText);
    setSerialValue(e.currentTarget.innerText);
  };

  const renderAutocomplete = () => {
    if (isShow && input) {
      if (filtered.length) {
        return (
          <ul className="bg-white w-full absolute shadow-2xl">
            {filtered.map((suggestion, index) => {
              return (
                <li
                  className={
                    'text-gray-900 cursor-pointer hover:bg-emerald-400 hover:font-medium p-2'
                  }
                  key={index}
                  onClick={(e) => serialClick(e)}
                >
                  {suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="bg-white w-full absolute shadow-2xl">
            <p className="text-gray-900 p-2">Meter not found</p>
          </div>
        );
      }
    }
    return <></>;
  };

  return (
    <div className="w-60 relative">
      <input
        className="w-full px-4 py-2 bg-gray-50 border border-gray-300 text-gray-900 text-lg font-medium rounded-sm outline-none focus:ring-1 focus:ring-emerald-300 focus:border-emerald-300"
        type="text"
        onChange={serialOnChange}
        value={input}
      />
      {renderAutocomplete()}
    </div>
  );
};
