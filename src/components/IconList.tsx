
import React from 'react';
import { Camera } from "lucide-react";

// Example component using Lucide icons safely
function IconButton({ iconData = [], onClick }) {
  // Always provide default values for props that might be undefined
  // For arrays, provide an empty array as default
  
  return (
    <button onClick={onClick} className="p-2 bg-blue-500 text-white rounded">
      {/* The proper way to use Lucide icons */}
      <Camera 
        size={24} 
        color="white" 
        strokeWidth={2}
      />
      {/* If you need to use custom data with the icon */}
      {iconData && iconData.length > 0 && (
        <span className="ml-2">{iconData.length}</span>
      )}
    </button>
  );
}

// Using the component
function App() {
  const [data, setData] = React.useState(null);
  
  React.useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setData(['item1', 'item2']);
    }, 1000);
  }, []);
  
  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Lucide Icon Example</h1>
      
      {/* Safe usage - passing null/undefined won't cause errors */}
      <IconButton iconData={data} onClick={() => console.log('clicked')} />
    </div>
  );
}

export default App;