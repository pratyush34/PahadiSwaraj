import React, { useState, useEffect } from 'react';
import { API_BASE, getAuthHeaders } from '../utils/auth.js';

export default function Dashboard() {
  const [formData, setFormData] = useState({
    productName: '',
    ingredients: '',
    weight: '',
    features: '',
    tone: 'Premium'
  });

  const [output, setOutput] = useState('');
  const [variations, setVariations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch recent history on load
  const fetchHistory = async () => {
    try {
<<<<<<< HEAD
      const token = localStorage.getItem('pahadiSwarajToken');
      const response = await fetch('http://localhost:5000/api/history', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
=======
      const response = await fetch(`${API_BASE}/api/history`, {
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
        }
      });
      const result = await response.json();
      if (result.success) {
        setHistory(result.data);
      } else if (result.error) {
        setErrorMessage(result.error);
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

  const getRandomVariation = () => {
    if (variations.length === 0) return '';
    const randomIndex = Math.floor(Math.random() * variations.length);
    return variations[randomIndex];
  };

  const handleRefreshVariation = () => {
    const randomOutput = getRandomVariation();
    setOutput(randomOutput);
    setCopied(false);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setCopied(false);

    try {
<<<<<<< HEAD
      const token = localStorage.getItem('pahadiSwarajToken');
      const response = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : ''
=======
      const response = await fetch(`${API_BASE}/api/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
>>>>>>> 6a3d0ab (Added backend auth files: User.js, auth.js, verifyToken.js, passport.js)
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        const variants = Array.isArray(result.data) ? result.data : [result.data];
        setVariations(variants);
        // Show a random variation instead of the first one
        const randomVariation = variants[Math.floor(Math.random() * variants.length)];
        setOutput(randomVariation || '');
        fetchHistory();
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

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/history/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      });
      if (res.ok) fetchHistory();
      else {
        const json = await res.json();
        setErrorMessage(json.error || 'Failed to delete record');
      }
    } catch (err) {
      setErrorMessage('Unable to reach backend to delete record.');
    }
  };

  const handleClearAll = async () => {
    if (!confirm('Clear all stored logs? This action cannot be undone.')) return;
    try {
      const res = await fetch(`${API_BASE}/api/history`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          ...getAuthHeaders()
        }
      });
      if (res.ok) fetchHistory();
      else {
        const json = await res.json();
        setErrorMessage(json.error || 'Failed to clear history');
      }
    } catch (err) {
      setErrorMessage('Unable to reach backend to clear history.');
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Description Generator</h2>
        <p>Create SEO-optimized product descriptions powered by AI</p>
      </div>

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
            <div>
              <h3>Optimized Description Output</h3>
              {variations.length > 1 && (
                <p style={{margin:'0.25rem 0 0 0', opacity:0.85}}>Random variant selected</p>
              )}
            </div>
            {output && (
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <button onClick={handleRefreshVariation} className="btn-secondary" title="Get another random variation">
                  🔄 Refresh
                </button>
                <button onClick={handleCopy} className={`btn-secondary ${copied ? 'copied' : ''}`}>
                  {copied ? '✓ Copied!' : 'Copy Text'}
                </button>
              </div>
            )}
          </div>

          {variations.length > 1 && (
            <div className="variant-list">
              {variations.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`btn-secondary variant-button ${output === item ? 'active' : ''}`}
                  onClick={() => setOutput(item)}
                >
                  Var {idx + 1}
                </button>
              ))}
            </div>
          )}

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
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap: 'wrap', gap: '1rem'}}>
            <h3>Recently Stored Logs</h3>
            <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
              <button className="btn-ghost" onClick={fetchHistory}>🔄 Refresh</button>
              <button className="btn-danger" onClick={handleClearAll}>🧹 Clear All</button>
            </div>
          </div>
          <div className="history-grid">
            {history.map((item) => (
              <div key={item._id} className="history-card">
                <div style={{display:'flex',justifyContent:'space-between', alignItems:'flex-start', gap: '0.5rem'}}>
                  <div style={{cursor:'pointer', flex:1}} onClick={() => setOutput(item.generatedOutput)}>
                    <h4>{item.productName} <span className="tag">{item.tone}</span></h4>
                    <p><strong>Ingredients:</strong> {item.ingredients} | <strong>Weight:</strong> {item.weight}</p>
                    <small>Click card to restore this copy text inside the editor window.</small>
                  </div>
                  <div className="history-actions">
                    <button title="Delete" className="btn-danger" onClick={() => handleDelete(item._id)}>🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
