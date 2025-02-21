import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Menu } from '@headlessui/react';

const questions = [
  {
    id: 1,
    question: 'What specific services or products does the golf business offer?',
    field: 'services',
  },
  {
    id: 2,
    question: 'Is the golf business a retail store, a golf course, or a training center?',
    field: 'businessType',
  },
  {
    id: 3,
    question: 'What is the target market of the golf business?',
    field: 'targetMarket',
  },
  {
    id: 4,
    question: 'How does the golf business differentiate itself from competitors?',
    field: 'differentiator',
  },
];

const roles = [
  'Running my own business',
  'In incubator or accelerator',
  'A business consultant or advisor',
  'A student',
  'Other',
];

export const QuestionPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const { updateBusinessPlan } = useStore();
  const [selectedRole, setSelectedRole] = useState('');

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      updateBusinessPlan({ 
        [questions[currentQuestion].field]: answer,
        role: selectedRole 
      });
      navigate('/business-canvas');
    } else {
      updateBusinessPlan({ [questions[currentQuestion].field]: answer });
      setCurrentQuestion(prev => prev + 1);
      setAnswer('');
    }
  };

  const handleGenerate = () => {
    // TODO: Implement AI generation logic
    handleNext();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-2xl mb-2">
          Hey! 👋 Answer some questions to
        </h1>
        <p className="text-gray-400">
          let our AI help improve your business description
        </p>
      </div>

      <div className="mb-4 text-[#c5ff00]">
        Question {currentQuestion + 1} of {questions.length}
      </div>

      <h2 className="text-3xl font-bold mb-8">
        {questions[currentQuestion].question}
      </h2>

      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full h-40 bg-gray-800 rounded-lg p-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-[#c5ff00] focus:outline-none mb-6"
      />

      {currentQuestion === questions.length - 1 && (
        <div className="mb-6">
          <h3 className="text-xl mb-4">I am</h3>
          <Menu as="div" className="relative">
            <Menu.Button className="w-full text-left px-4 py-2 bg-gray-800 rounded-lg text-white">
              {selectedRole || 'Select ...'}
            </Menu.Button>
            <Menu.Items className="absolute w-full mt-2 bg-gray-800 rounded-lg shadow-lg">
              {roles.map((role) => (
                <Menu.Item key={role}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-gray-700' : ''
                      } w-full text-left px-4 py-2 text-white`}
                      onClick={() => setSelectedRole(role)}
                    >
                      {role}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleGenerate}
          className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
        >
          Generate for me
        </button>
        
        <button
          onClick={handleNext}
          disabled={currentQuestion === questions.length - 1 && !selectedRole}
          className="bg-[#c5ff00] text-black px-6 py-2 rounded-full flex items-center space-x-2 hover:bg-[#b3e600] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Next</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};