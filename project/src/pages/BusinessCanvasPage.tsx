import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDownToLine } from 'lucide-react';

interface CanvasSection {
  title: string;
  content: string[];
  isSubscriptionRequired?: boolean;
}

export const BusinessCanvasPage: React.FC = () => {
  const navigate = useNavigate();

  const canvasSections: CanvasSection[] = [
    {
      title: 'Problem',
      content: [
        'Limited access to exclusive golf courses for affluent individuals',
        'Lack of personalized and premium golf services tailored to high-end clientele',
        'Difficulty in finding high-end golf equipment and convenient location'
      ]
    },
    {
      title: 'Solution',
      content: [
        'Offering personalized golf lessons from professional instructors',
        'Providing custom club fittings & rentals',
        'Organizing exclusive golf tournaments and vacations'
      ]
    },
    {
      title: 'Unique Value Propositions',
      content: [
        'Exclusive access to luxury golf courses and memberships',
        'Personalized golf experiences tailored to the needs',
        'Premium services such as custom club fittings and high-end golf equipment sales'
      ]
    },
    {
      title: 'Unfair Advantage',
      content: [
        'Exclusive contracts with high-end golf equipment suppliers and manufacturers',
        'Strong relationships with premium golf course owners for premium membership offerings',
        'Personalized service and curated experiences for affluent clientele'
      ]
    },
    {
      title: 'Key Metrics',
      content: [],
      isSubscriptionRequired: true
    },
    {
      title: 'Cost Structure',
      content: [],
      isSubscriptionRequired: true
    },
    {
      title: 'Name Suggestion',
      content: [
        'PureGolf',
        'TopGolf',
        'Golf Pro',
        'Grand Golf Club',
        'Golf\'s Studio'
      ]
    },
    {
      title: 'Revenue Streams',
      content: [],
      isSubscriptionRequired: true
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Generated with AI</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/business-graph')}
            className="bg-[#c5ff00] text-black px-6 py-2 rounded-md hover:bg-[#b3e600] transition-colors"
          >
            Business Graph Analysis
          </button>
          <button
            onClick={() => {/* Handle PDF download */}}
            className="flex items-center space-x-2 bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            <ArrowDownToLine size={20} />
            <span>Download as PDF</span>
          </button>
        </div>
      </div>

      <p className="text-yellow-400 mb-6">↗ Click on any cell to edit</p>

      <div className="grid grid-cols-2 gap-4">
        {canvasSections.map((section, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            {section.isSubscriptionRequired ? (
              <button className="w-full bg-[#c5ff00] text-black py-2 rounded-md hover:bg-[#b3e600] transition-colors">
                Subscribe to view
              </button>
            ) : (
              <ul className="space-y-2">
                {section.content.map((item, i) => (
                  <li key={i} className="text-gray-300">{item}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};