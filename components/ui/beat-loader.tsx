"use client";

export function BeatLoader() {
  return (
    <div className="flex space-x-2 justify-center items-center h-5">
      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-bounce"></div>
    </div>
  );
}