import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  value: number; // 0 to 100
  size?: string;
  color?: string;
}

const CircularProgressBar: React.FC<ProgressBarProps> = ({ 
  value, 
  size = '12rem', 
  color = '#369' 
}) => {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      className={styles.progressbar}
      style={{ 
        ['--value' as any]: value,
        ['--size' as any]: size,
        ['--fg' as any]: color 
      }}
    />
  );
};

export default CircularProgressBar;