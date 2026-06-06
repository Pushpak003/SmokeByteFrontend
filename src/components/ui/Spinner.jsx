// src/components/ui/Spinner.jsx

import './Spinner.css';

const Spinner = ({ size = 'md'}) => {
  return <div className={`spinner spinner-${size}`}></div>;
};

export default Spinner; // <-- This line is the solution. It was likely missing.