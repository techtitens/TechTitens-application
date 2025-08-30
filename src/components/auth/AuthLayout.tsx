import React from "react";
import { Zap, Shield, BarChart3 } from "lucide-react";
import Logo from "../extra/SiteLogo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
}) => {
  return (
    <div className='min-h-screen bg-slate-900 flex'>
      {/* Left Panel - Branding */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 p-12 flex-col justify-between'>
        <div>
          <div className='flex items-center space-x-3 mb-8'>
            {/* <div className='w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center'>
              <Zap className='w-6 h-6 text-white' />
            </div>
            <h1 className='text-2xl font-bold text-white'>TechTitans</h1> */}
            <Logo />
          </div>

          <div className='space-y-8'>
            <div>
              <h2 className='text-4xl font-bold text-white mb-4'>
                AI-Powered Industrial Operations
              </h2>
              <p className='text-xl text-slate-300'>
                Optimize workflows, reduce inefficiencies, and boost performance
                with intelligent automation.
              </p>
            </div>

            <div className='space-y-6'>
              <div className='flex items-start space-x-4'>
                <Shield className='w-6 h-6 text-blue-400 mt-1 flex-shrink-0' />
                <div>
                  <h3 className='text-lg font-semibold text-white'>
                    Enterprise Security
                  </h3>
                  <p className='text-slate-400'>
                    Bank-grade encryption and compliance standards
                  </p>
                </div>
              </div>

              <div className='flex items-start space-x-4'>
                <BarChart3 className='w-6 h-6 text-blue-400 mt-1 flex-shrink-0' />
                <div>
                  <h3 className='text-lg font-semibold text-white'>
                    Real-time Analytics
                  </h3>
                  <p className='text-slate-400'>
                    Live performance metrics and predictive insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='text-slate-400 text-sm'>
          © 2025 TechTitans.com. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
        <div className='w-full max-w-md'>
          <div className='lg:hidden mb-8'>
            <div className='flex items-center justify-center space-x-3 mb-4'>
              <div className='w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center'>
                <Zap className='w-5 h-5 text-white' />
              </div>
              <h1 className='text-2xl font-bold text-white'>TechTitans</h1>
            </div>
          </div>

          <div className='mb-8'>
            <h2 className='text-3xl font-bold text-white mb-2'>{title}</h2>
            <p className='text-slate-400'>{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};
