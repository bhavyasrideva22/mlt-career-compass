import React from 'react';
import { cn } from '@/lib/utils';

interface RadarChartProps {
  data: Array<{ label: string; value: number; color?: string }>;
  size?: number;
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  data,
  size = 300,
  className
}) => {
  const center = size / 2;
  const radius = size * 0.35;
  const angleStep = (2 * Math.PI) / data.length;

  const getPointPosition = (index: number, value: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const distance = (value / 100) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle)
    };
  };

  const getAxisEndpoint = (index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle)
    };
  };

  const pathData = data
    .map((item, index) => {
      const point = getPointPosition(index, item.value);
      return `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
    })
    .join(' ') + ' Z';

  return (
    <div className={cn('relative', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        {/* Grid circles */}
        {[20, 40, 60, 80, 100].map((percentage) => (
          <circle
            key={percentage}
            cx={center}
            cy={center}
            r={(percentage / 100) * radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted opacity-20"
          />
        ))}
        
        {/* Axis lines */}
        {data.map((_, index) => {
          const endpoint = getAxisEndpoint(index);
          return (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={endpoint.x}
              y2={endpoint.y}
              stroke="currentColor"
              strokeWidth="1"
              className="text-muted opacity-30"
            />
          );
        })}
        
        {/* Data area */}
        <path
          d={pathData}
          fill="hsl(var(--primary))"
          fillOpacity="0.2"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {data.map((item, index) => {
          const point = getPointPosition(index, item.value);
          return (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="hsl(var(--primary))"
              stroke="white"
              strokeWidth="2"
            />
          );
        })}
      </svg>
      
      {/* Labels */}
      {data.map((item, index) => {
        const labelPosition = getAxisEndpoint(index);
        const angle = index * angleStep - Math.PI / 2;
        const isLeft = Math.cos(angle) < -0.1;
        const isRight = Math.cos(angle) > 0.1;
        
        return (
          <div
            key={index}
            className="absolute text-sm font-medium text-foreground"
            style={{
              left: labelPosition.x - (isLeft ? 80 : isRight ? 0 : 40),
              top: labelPosition.y - 10,
              width: isLeft || isRight ? '80px' : '80px',
              textAlign: isLeft ? 'right' : isRight ? 'left' : 'center'
            }}
          >
            {item.label}
          </div>
        );
      })}
    </div>
  );
};