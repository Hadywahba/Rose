"use client";

type  ErrorProps={
  error:Error;
  reset:()=>void;
}
export default function DashBoardLayoutError({ error, reset }: ErrorProps) {
  return (
    <div>
      {error.message}
      <button onClick={() => reset()}>Try Again</button>
    </div>
  );
}
