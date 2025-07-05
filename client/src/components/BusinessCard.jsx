import { useBusiness } from '../context/BusinessContext';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

const BusinessCard = () => {
  const { businessData, isLoading, error, regenerateHeadline } = useBusiness();
  const navigate = useNavigate();

  if (!businessData) {
    navigate('/');
    return null;
  }

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="bg-white py-8 px-6 shadow rounded-lg">
      <button
        onClick={handleBack}
        className="mb-4 text-sm text-blue-600 hover:text-blue-800"
      >
        ← Back to form
      </button>
      
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{businessData.name}</h2>
      <p className="text-gray-600 mb-6">{businessData.location}</p>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center mb-3">
          <span className="text-2xl font-bold text-gray-900 mr-2">{businessData.rating}★</span>
          <span className="text-sm text-gray-600">({businessData.reviews} reviews)</span>
        </div>
        <p className="text-gray-700 italic">"{businessData.headline}"</p>
      </div>
      
      <button
        onClick={regenerateHeadline}
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? <Spinner /> : 'Regenerate SEO Headline'}
      </button>
    </div>
  );
};

export default BusinessCard;