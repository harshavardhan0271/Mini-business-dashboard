import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const BusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [businessData, setBusinessData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchBusinessData = async (name, location) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/business-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, location }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch business data');
      }
      
      const data = await response.json();
      setBusinessData({ ...data, name, location });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const regenerateHeadline = async () => {
    if (!businessData) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/regenerate-headline?name=${encodeURIComponent(
          businessData.name
        )}&location=${encodeURIComponent(businessData.location)}&currentHeadline=${encodeURIComponent(
          businessData.headline
        )}`
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to regenerate headline');
      }
      
      const { headline } = await response.json();
      setBusinessData({ ...businessData, headline });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BusinessContext.Provider
      value={{
        businessData,
        isLoading,
        error,
        fetchBusinessData,
        regenerateHeadline,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => useContext(BusinessContext);