import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  version?: 'light' | 'dark' | 'dark-outline' | 'minimized' | 'transparent';
  size?: number;
  className?: string;
}

export const Logo: FC<LogoProps> = ({ version = 'dark-outline', size = 140, className = '' }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const fileName = `${version}-logo.svg`;

  return (
    <button onClick={handleGoHome}>
      <img
        className={className}
        alt={fileName}
        src={`${window.location.origin}/logos/${fileName}`}
        width={size}
        height={size}
      />
    </button>
  );
};
