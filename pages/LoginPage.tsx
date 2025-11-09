
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const user = await login(email, password);
    setLoading(false);
    if (user) {
      navigate(user.role === 'ADMIN' ? '/admin' : '/');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        {error && <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input label="Email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <div>
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </form>
        <div className="text-sm text-center mt-4">
          <a href="#" className="font-medium text-primary hover:text-blue-700">Forgot password?</a>
        </div>
        <div className="text-sm text-center mt-2 text-gray-600">
          Don't have an account? <a href="#/signup" className="font-medium text-primary hover:text-blue-700">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
