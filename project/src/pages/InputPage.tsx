import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

export const InputPage: React.FC = () => {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const updateBusinessPlan = useStore((state) => state.updateBusinessPlan);

  const handleSubmit = () => {
    updateBusinessPlan({ description });
    navigate('/questions');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">What do you want to build?</h1>
      <p className="text-gray-400 text-center mb-8">
        Answer a few quick questions, and your business plan will be ready in minutes.
      </p>
      
      <div className="space-y-6">
        <div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="How can help you today?"
            className="w-full h-40 bg-gray-800 rounded-lg p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#c5ff00] focus:outline-none"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            {[
              'Start a blog with Astro',
              'Build a mobile app with NativeScript',
              'Start YouTube Channel',
              'Code a video with Remotion',
              'SaaS business idea for Future'
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setDescription(suggestion)}
                className="text-sm text-gray-400 hover:text-[#c5ff00]"
              >
                {suggestion}
              </button>
            ))}
          </div>
          
          <button
            onClick={handleSubmit}
            className="bg-[#c5ff00] text-black px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-[#b3e600] transition-colors"
          >
            <span>Next</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};