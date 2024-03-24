import React, { useState, useEffect } from 'react';

const Dashboard = ({ voterId, parties }) => {
  const [user, setUser] = useState(null);
  const [votedParties, setVotedParties] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!voterId) {
          console.error('Voter ID is undefined or null');
          return;
        }

        const response = await fetch(`http://127.0.0.1:8000/dashboard/${encodeURIComponent(voterId)}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        console.log('User data:', data); // Log the received data for debugging
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [voterId]);

  const handleVote = (party) => {
    if (votedParties.includes(party)) {
      alert(`You have already voted for ${party}`);
    } else {
      setVotedParties([...votedParties, party]);
      console.log(`Voted for ${party}`);
    }
  };

  console.log('User state:', user); // Log the user state for debugging

  return (
    <div className='dashboard-container' style={{ backgroundColor: 'cyan', minHeight: '100vh', padding: '20px' }}>
      <h2>Welcome, Voter {voterId}</h2>
      {user && (
        <div>
          <h3>User Information:</h3>
          <p>Voter ID: {user.voter_id}</p>
          <p>Name: {user.name}</p>
          <p>Status: {user.status}</p>
        </div>
      )}
      <h3>Parties:</h3>
      <ul>
        {parties.map((party, index) => (
          <li key={index} style={{ marginBottom: '10px' }}>
            {party}{' '}
            <button
              onClick={() => handleVote(party)}
              style={{ marginLeft: '10px', padding: '5px 10px', borderRadius: '5px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              Vote
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;