// client/src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { BusinessProvider } from './context/BusinessContext'
import BusinessForm from './components/BusinessForm'
import BusinessCard from './components/BusinessCard'

function App() {
  return (
    <Router> {/* Only one Router in your entire app */}
      <BusinessProvider>
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
              <p className="mt-2 text-sm text-gray-600">
                View your simulated business performance data
              </p>
            </div>
            <Routes>
              <Route path="/" element={<BusinessForm />} />
              <Route path="/dashboard" element={<BusinessCard />} />
            </Routes>
          </div>
        </div>
      </BusinessProvider>
    </Router>
  )
}

export default App