import React from 'react';
import { useNavigate } from 'react-router-dom';

const marketShareData = [
  { month: 'Jan', value1: 65, value2: 45 },
  { month: 'Feb', value1: 55, value2: 35 },
  { month: 'Mar', value1: 75, value2: 55 },
  { month: 'Apr', value1: 85, value2: 65 },
  { month: 'May', value1: 75, value2: 55 },
  { month: 'Jun', value1: 90, value2: 70 },
  { month: 'Jul', value1: 85, value2: 65 },
  { month: 'Aug', value1: 95, value2: 75 },
  { month: 'Sep', value1: 85, value2: 65 },
  { month: 'Oct', value1: 80, value2: 60 },
  { month: 'Nov', value1: 90, value2: 70 },
  { month: 'Dec', value1: 95, value2: 75 },
];

const competitiveAnalysis = [
  { metric: 'Market Growth', value: 92 },
  { metric: 'Customer Satisfaction', value: 88 },
  { metric: 'Brand Recognition', value: 75 },
  { metric: 'Revenue Growth', value: 85 },
  { metric: 'Market Share', value: 70 },
];

export const BusinessGraphPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Business Graph Analysis</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/business-canvas')}
            className="bg-[#c5ff00] text-black px-6 py-2 rounded-full hover:bg-[#b3e600] transition-colors"
          >
            Business Canvas
          </button>
          <button className="bg-[#c5ff00] text-black px-6 py-2 rounded-full hover:bg-[#b3e600] transition-colors">
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">1. Market Share Distribution</h2>
          <div className="h-64 relative">
            {marketShareData.map((data, index) => (
              <div key={index} className="flex items-end absolute" style={{
                left: `${(index / marketShareData.length) * 100}%`,
                bottom: 0,
                width: '20px'
              }}>
                <div
                  className="w-4 bg-blue-500 rounded-t"
                  style={{ height: `${data.value1}%` }}
                />
                <div
                  className="w-4 bg-purple-500 rounded-t ml-1"
                  style={{ height: `${data.value2}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {marketShareData.map((data, index) => (
              <span key={index} className="text-xs text-gray-400">{data.month}</span>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">2. Competitive Analysis</h2>
          <div className="space-y-4">
            {competitiveAnalysis.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.metric}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full">
                  <div
                    className="h-full bg-[#c5ff00] rounded-full"
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <textarea
          placeholder="Type here ..."
          className="w-full h-32 bg-gray-800 rounded-lg p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#c5ff00] focus:outline-none"
        />
        <p className="text-gray-400 mt-2">Elevate AI can make mistakes.</p>
      </div>
    </div>
  );
};