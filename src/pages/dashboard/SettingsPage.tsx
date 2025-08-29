import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Building, Mail, Lock, Bell, Shield, Database, Key, Moon, Sun, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: user?.email || '',
    company: 'Acme Corporation',
    role: 'Operations Manager',
    phone: '+1 (555) 123-4567',
    department: 'Manufacturing'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [apiKey] = useState('sk-tt-1234567890abcdef1234567890abcdef');

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    performanceReports: true,
    systemMaintenance: false,
    weeklyDigest: true,
    criticalAlerts: true,
    simulationComplete: true,
    kpiThresholds: false
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'api', label: 'API Access', icon: Key },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Database }
  ];

  const handleSave = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    toast.success('Settings updated successfully!');
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    toast.success('Password updated successfully!');
  };

  const generateNewApiKey = () => {
    toast.success('New API key generated! Please save it securely.');
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordDataChange = (field: string, value: string) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
          <p className="text-slate-600">Manage your profile, security, and system preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-left ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <motion.div 
            className="bg-white rounded-lg shadow-sm border border-slate-200 p-6"
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Profile Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => handleProfileChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                    <input
                      type="text"
                      value={profileData.company}
                      onChange={(e) => handleProfileChange('company', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                    <input
                      type="text"
                      value={profileData.role}
                      onChange={(e) => handleProfileChange('role', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                    <select
                      value={profileData.department}
                      onChange={(e) => handleProfileChange('department', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Quality Control">Quality Control</option>
                      <option value="Supply Chain">Supply Chain</option>
                      <option value="Operations">Operations</option>
                      <option value="Management">Management</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Security Settings</h3>
                
                {/* Change Password */}
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-medium text-slate-900 mb-4">Change Password</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                      <div className="relative">
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={passwordData.currentPassword}
                          onChange={(e) => handlePasswordDataChange('currentPassword', e.target.value)}
                          className="w-full px-3 py-2 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={passwordData.newPassword}
                          onChange={(e) => handlePasswordDataChange('newPassword', e.target.value)}
                          className="w-full px-3 py-2 pr-10 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => handlePasswordDataChange('confirmPassword', e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm new password"
                      />
                    </div>
                    
                    <button
                      onClick={handlePasswordChange}
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
                    >
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </div>
                
                {/* Two-Factor Authentication */}
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-medium text-slate-900 mb-2">Two-Factor Authentication</h4>
                  <p className="text-sm text-slate-600 mb-3">Add an extra layer of security to your account</p>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
                    Enable 2FA
                  </button>
                </div>
                
                {/* Active Sessions */}
                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-medium text-slate-900 mb-3">Active Sessions</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded">
                      <div>
                        <div className="font-medium text-slate-900">Current Session</div>
                        <div className="text-sm text-slate-600">Chrome on Windows • Active now</div>
                      </div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded">
                      <div>
                        <div className="font-medium text-slate-900">Mobile Session</div>
                        <div className="text-sm text-slate-600">Safari on iPhone • 2 hours ago</div>
                      </div>
                      <button className="text-red-600 hover:text-red-700 text-sm">Revoke</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">API Access Management</h3>
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">API Key</h4>
                  <p className="text-sm text-blue-700 mb-4">Use this key to access TechTitans API endpoints</p>
                  
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 relative">
                      <input
                        type={showApiKey ? 'text' : 'password'}
                        value={apiKey}
                        readOnly
                        className="w-full px-3 py-2 pr-10 bg-white border border-blue-300 rounded-lg font-mono text-sm"
                      />
                      <button
                        onClick={() => setShowApiKey(!showApiKey)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(apiKey)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                    >
                      Copy
                    </button>
                  </div>
                  
                  <button
                    onClick={generateNewApiKey}
                    className="mt-3 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all"
                  >
                    Generate New Key
                  </button>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg">
                  <h4 className="font-medium text-slate-900 mb-3">API Usage Statistics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-slate-900">1,247</div>
                      <div className="text-sm text-slate-600">Total Requests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">99.8%</div>
                      <div className="text-sm text-slate-600">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">156ms</div>
                      <div className="text-sm text-slate-600">Avg Response</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">2.4GB</div>
                      <div className="text-sm text-slate-600">Data Transfer</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">Notification Preferences</h3>
                
                <div className="space-y-4">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <h4 className="font-medium text-slate-900 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {key === 'emailAlerts' && 'Receive email notifications for system alerts'}
                          {key === 'performanceReports' && 'Weekly performance summary reports'}
                          {key === 'systemMaintenance' && 'Scheduled maintenance notifications'}
                          {key === 'weeklyDigest' && 'Weekly digest of key metrics and insights'}
                          {key === 'criticalAlerts' && 'Immediate notifications for critical issues'}
                          {key === 'simulationComplete' && 'Notifications when simulations finish'}
                          {key === 'kpiThresholds' && 'Alerts when KPIs exceed thresholds'}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleNotificationChange(key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-900">System Preferences</h3>
                
                {/* Theme Toggle */}
                <div className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900">Theme</h4>
                      <p className="text-sm text-slate-600">Choose your preferred interface theme</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setDarkMode(false)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                          !darkMode ? 'bg-blue-600 text-white' : 'bg-white text-slate-700 border border-slate-300'
                        }`}
                      >
                        <Sun className="w-4 h-4" />
                        <span>Light</span>
                      </button>
                      <button
                        onClick={() => setDarkMode(true)}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                          darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-700 border border-slate-300'
                        }`}
                      >
                        <Moon className="w-4 h-4" />
                        <span>Dark</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Data Preferences */}
                <div className="space-y-4">
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Default Chart Type</h4>
                    <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="line">Line Charts</option>
                      <option value="bar">Bar Charts</option>
                      <option value="area">Area Charts</option>
                    </select>
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Data Refresh Rate</h4>
                    <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="realtime">Real-time</option>
                      <option value="5min">Every 5 minutes</option>
                      <option value="15min">Every 15 minutes</option>
                      <option value="1hour">Every hour</option>
                    </select>
                  </div>
                  
                  <div className="p-4 bg-slate-50 rounded-lg">
                    <h4 className="font-medium text-slate-900 mb-2">Time Zone</h4>
                    <select className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                      <option value="CST">Central Time</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-slate-200">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{loading ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};