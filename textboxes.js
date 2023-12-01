// TextBoxes.js
import React, { useState } from "react";

const TextBoxes = () => {
  const [textValues, setTextValues] = useState(["", "", "", "", "", ""]);

  const handleInputChange = (index, value) => {
    const newValues = [...textValues];
    newValues[index] = value;
    setTextValues(newValues);
    console.log(newValues);
  };

  return (
    <div>
      {textValues.map((value, index) => (
        <input
          key={index}
          type="text"
          value={value}
          onChange={(e) => handleInputChange(index, e.target.value)}
        />
      ))}
    </div>
  );
};

export default TextBoxes;
