import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const SliderComponent: React.FC = () => {
    const MIN_EXPONENT = -30;
    const MAX_EXPONENT = -1;
    const [currentExponent, setCurrentExponent] = useState(-11);
    const context = useAppContext();
    const currentValue = 6.674 * Math.pow(10, currentExponent);
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentExponent(parseInt(event.target.value, 10));
      context.setGState(6.674 * Math.pow(10, parseInt(event.target.value, 10)));
    };
    return (
      <div>
        <input
          type="range"
          min={MIN_EXPONENT}
          max={MAX_EXPONENT}
          value={currentExponent}
          step="1" 
          onChange={handleChange}
        />
        <p>Current Gravity: {currentValue.toExponential(3)}</p> 
        <p>mass: {new Intl.NumberFormat('en-US').format(context.telemetry1.position.mass)} kg</p>
      </div>
    );
  };
  

export default SliderComponent;
