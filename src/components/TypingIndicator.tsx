import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex gap-2 p-4">
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}