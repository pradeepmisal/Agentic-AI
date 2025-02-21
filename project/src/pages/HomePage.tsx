import React from 'react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">
          Get your Free professional{' '}
          <span className="text-[#c5ff00]">Business Plan</span> ready in Minutes
        </h1>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Your business plan is just a click away. Answer a few questions, and our free AI business plan generator
          will craft a detailed business plan tailored just for you in minutes.
        </p>
        <button
          onClick={() => navigate('/input')}
          className="bg-[#c5ff00] text-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-[#b3e600] transition-colors"
        >
          Generate your Plan
        </button>
      </div>

      <div className="mt-16 text-center">
        <p className="text-xl mb-8">Join over 1000+ Entrepreneurs & business owners</p>
        <div className="flex justify-center space-x-12 opacity-70">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" alt="Slack" className="h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Microsoft_Xbox_Logo.svg/1024px-Microsoft_Xbox_Logo.svg.png" alt="Microsoft" className="h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/512px-Microsoft_logo.svg.png" alt="Microsoft" className="h-8" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1920px-Google_2015_logo.svg.png" alt="Google" className="h-8" />
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why <span className="text-[#c5ff00]">Elevate AI</span> is the Best AI Business Plan Generator?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'AI Assistance - A way to save time',
              description: 'Work smarter, not harder. Partner with our AI generator. Input your ideas, and let the AI handle the structuring and drafting, saving you time and effort.',
            },
            {
              title: 'It works for any Industry',
              description: 'Whether you are in retail or tech, our AI generator provides industry-specific advice in your planning process.',
            },
            {
              title: "It's Free - Get 3 Trials Free",
              description: 'Start planning your business for free. Our business plan generator provides tailored advice and structured formats without financial commitment.',
            },
          ].map((feature, index) => (
            <div key={index} className="p-6 rounded-lg border border-gray-800 hover:border-[#c5ff00] transition-colors">
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};