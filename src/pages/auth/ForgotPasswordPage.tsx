import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const ForgotPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await resetPassword(email);
    
    if (error) {
      setError(error.message);
      toast.error('Failed to send reset email. Please try again.');
    } else {
      setSuccess(true);
      toast.success('Password reset email sent! Check your inbox.');
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <AuthLayout 
        title="Check your email" 
        subtitle="We've sent you a password reset link"
      >
        <div className="text-center space-y-6">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
          
          <div>
            <p className="text-slate-300 mb-4">
              We've sent a password reset link to <strong className="text-white">{email}</strong>
            </p>
            <p className="text-sm text-slate-400">
              Check your inbox and click the link to reset your password. The link will expire in 24 hours.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => setSuccess(false)}
              className="w-full py-3 px-4 border border-slate-600 rounded-lg text-slate-300 hover:bg-slate-800 transition-all"
            >
              Try different email
            </button>
            
            <Link
              to="/auth/login"
              className="flex items-center justify-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to sign in</span>
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email to receive a password reset link"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-900/20 border border-red-500/20 rounded-lg p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Sending...</span>
            </div>
          ) : (
            'Send Reset Link'
          )}
        </button>

        <div className="text-center">
          <Link
            to="/auth/login"
            className="flex items-center justify-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to sign in</span>
          </Link>
        </div>

        <div className="text-center pt-4">
          <span className="text-slate-400">Don't have an account? </span>
          <Link 
            to="/auth/register" 
            className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Sign up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};