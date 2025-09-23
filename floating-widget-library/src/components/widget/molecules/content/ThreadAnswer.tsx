import React from 'react';

interface ThreadAnswerProps {
  answer: string;
  className?: string;
}

export const ThreadAnswer: React.FC<ThreadAnswerProps> = ({
  answer,
  className = ''
}) => {
  return (
    <div className={`${className}`}>
      <p className="text-gray-300 text-base leading-relaxed">
        {answer}
      </p>
    </div>
  );
};

export default ThreadAnswer;