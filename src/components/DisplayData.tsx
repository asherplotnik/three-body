import "./DisplayData.css";
import SliderComponent from "./SliderComponent";

interface DisplayDataProps {
    toggle: Function;
}
const DisplayData = (props: DisplayDataProps) => {
  const toggleTwoBodies = () => {
    props.toggle();
  }

  return (
    <div className="Inputs">
      <div>G <SliderComponent /></div>
      <div>
        only two bodies: <input type="checkbox" onChange={toggleTwoBodies}/>
      </div>
    </div>
    
  );
};


export default DisplayData;
