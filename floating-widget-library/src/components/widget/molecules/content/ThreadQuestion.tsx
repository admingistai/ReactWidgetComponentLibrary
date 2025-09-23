import React from 'react';
import { ProfileImage } from '../../atoms/images/ProfileImage';

interface ThreadQuestionProps {
  profileImage: string;
  question: string;
  className?: string;
}

export const ThreadQuestion: React.FC<ThreadQuestionProps> = ({
  profileImage,
  question,
  className = ''
}) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <ProfileImage src={profileImage} alt="User profile" size={64} />
      <h3 className="text-white text-lg font-medium flex-1">{question}</h3>
    </div>
  );
};

export default ThreadQuestion;