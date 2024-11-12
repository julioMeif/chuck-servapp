// pages/index.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [joke, setJoke] = useState<string>('');
  const [azureResponse, setAzureResponse] = useState<string>('');

  // Fetch a joke on component mount
  useEffect(() => {
    fetchJoke();
  }, []);

  // Function to fetch a new joke from Chuck Norris API
  const fetchJoke = async () => {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      setJoke(response.data.value);
    } catch (error) {
      console.error('Error fetching joke:', error);
    }
  };

  // Function to call Azure Function
  const callAzureFunction = async () => {
    try {
      const response = await axios.get('/api/callAzureFunction'); // Proxy for Azure function
      setAzureResponse(response.data.message || 'Azure function triggered successfully!');
    } catch (error) {
      console.error('Error calling Azure function:', error);
      setAzureResponse('Failed to call Azure function');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Chuck Norris Jokes</h1>
      <p>{joke || "Loading joke..."}</p>
      <button onClick={fetchJoke}>Get Another Joke</button>
      <br /><br />
    </div>
  );
}
