import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [formData, setFormData] = useState({
    productName: '',
    ingredients: '',
    weight: '',
    features: '',
    tone: 'Premium'
  });

  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch recent history on load
  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/history');
      const result = await response.json();
      if (result.success) {
        setHistory(result.data);
      }
    } catch (err) {
      console.log('Could not connect to database history route.');
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setCopied(false);

    try {
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        setOutput(result.data);
        fetchHistory(); // Refresh recent items pipeline
      } else {
        setErrorMessage(result.error || 'Something went wrong.');
      }
    } catch (error) {
      setErrorMessage('Unable to connect to the backend server. Verify your backend is up on port 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      setErrorMessage('Failed to copy text safely to clipboard.');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>HimShakti</h1>
        <p>E-Commerce Keyword-Rich Description Optimizer</p>
      </header>

      <div className="workspace">
        {/* Form Panel */}
        <form onSubmit={handleGenerate} className="card form-panel">
          <h3>Product Variables</h3>
          
          <div className="form-group">
            <label>Product Name</label>
            <input 
              type="text" 
              name="productName" 
              value={formData.productName} 
              onChange={handleInputChange} 
              placeholder="e.g., Himalayan A2 Cow Ghee" 
              required 
            />
          </div>

          <div className="form-group">
            <label>Key Ingredients</label>
            <input 
              type="text" 
              name="ingredients" 
              value={formData.ingredients} 
              onChange={handleInputChange} 
              placeholder="e.g., Pure A2 Milk, Herbs" 
              required 
            />
          </div>

          <div className="form-group">
            <label>Weight / Volume</label>
            <input 
              type="text" 
              name="weight" 
              value={formData.weight} 
              onChange={handleInputChange} 
              placeholder="e.g., 500g, 1L" 
              required 
            />
          </div>

          <div className="form-group">
            <label>Key Features (Comma Separated)</label>
            <textarea 
              name="features" 
              value={formData.features} 
              onChange={handleInputChange} 
              placeholder="e.g., Bilona method, High protein, 100% Organic"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Brand & Copy Tone</label>
            <select name="tone" value={formData.tone} onChange={handleInputChange}>
              <option value="Premium">Premium (Luxury & Pure Origin)</option>
              <option value="Traditional">Traditional (Heritage & Authenticity)</option>
              <option value="Health-Focused">Health-Focused (Wellness & Functionality)</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? 'Crafting with AI...' : 'Generate Optimized Description'}
          </button>
          
          {errorMessage && <p className="error-text">{errorMessage}</p>}
        </form>

        {/* Output Panel */}
        <div className="card output-panel">
          <div className="output-header">
            <h3>Optimized Description Output</h3>
            {output && (
              <button onClick={handleCopy} className={`btn-secondary ${copied ? 'copied' : ''}`}>
                {copied ? '✓ Copied to Clipboard!' : 'Copy Copy Text'}
              </button>
            )}
          </div>

          <textarea 
            value={output} 
            onChange={(e) => setOutput(e.target.value)} 
            placeholder="Your high-converting product description will generate right here. You can directly type inside this box to clean or refine the copy before executing your copy action."
            className="output-box"
            rows="14"
            disabled={!output}
          />
        </div>
      </div>

      {/* History Feed */}
      {history.length > 0 && (
        <div className="history-section">
          <h3>Recently Stored Logs (MongoDB Atlas Pipeline)</h3>
          <div className="history-grid">
            {history.map((item) => (
              <div key={item._id} className="history-card" onClick={() => setOutput(item.generatedOutput)}>
                <h4>{item.productName} <span className="tag">{item.tone}</span></h4>
                <p><strong>Ingredients:</strong> {item.ingredients} | <strong>Weight:</strong> {item.weight}</p>
                <small>Click card to restore this copy text inside the editor window.</small>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}