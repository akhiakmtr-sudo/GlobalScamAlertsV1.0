
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

const SignupPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const user = await signup(fullName, email, password);
    setLoading(false);
    if (user) {
      // In a real app, you would show a "please verify your email" message.
      // For this mock, we navigate to the home page.
      alert('Signup successful! You are now logged in.');
      navigate('/');
    } else {
      setError('An account with this email already exists.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Full Name" name="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          <Input label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <div>
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>
          </div>
        </form>
        <div className="text-sm text-center mt-4 text-gray-600">
          Already have an account? <a href="#/login" className="font-medium text-primary hover:text-blue-700">Login</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
