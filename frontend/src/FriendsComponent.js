import React, { useEffect, useState, useRef } from 'react';
import FriendsNetwork from './FriendsNetwork';

function FriendsComponent() {
  const [networkData, setNetworkData] = useState(null);
  const requestMadeRef = useRef(false);

  useEffect(() => {
    if (!requestMadeRef.current) {
      async function fetchNetworkData() {
        try {
          const response = await fetch('/api/friendsnetwork');
          if (response.ok) {
            const data = await response.json();
            setNetworkData(data);
          } else {
            throw new Error(`Request failed with status: ${response.status}`);
          }
        } catch (error) {
          console.error('Error fetching network data:', error);
        }
      }
      
      fetchNetworkData();
      requestMadeRef.current = true;
    }
  }, []);

  return (
    <div>
      {networkData ? (
        <FriendsNetwork nodes={networkData.nodes} edges={networkData.edges} />
      ) : (
        <p>Loading network data...</p>
      )}
    </div>
  );
}

export default FriendsComponent;
