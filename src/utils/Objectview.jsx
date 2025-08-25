import React from "react";

export function Objectview({ item }) {
  const keys = Object.keys(item).slice(0, 2);
  return (
    <>
      {keys.map((key) => (
        <div key={key}>
          <strong>{key}:</strong> {item[key]}
        </div>
      ))}
    </>
  );
}
