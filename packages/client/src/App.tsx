import React from 'react';
import { useMeteors } from './hooks';

export const App = () => {
  const { isLoading, handleMassThresholdChange, handleYearChange, meteors, massThreshold, year } = useMeteors()

  return (
    <div>
      <section>Meteors</section>
      <input type="number" value={year} onChange={handleYearChange} />
      <input type="text" value={massThreshold} onChange={handleMassThresholdChange} />
      {isLoading ? 'Loading...' : meteors?.map(
        (meteor) => (
          <div key={meteor.id}>
            <div>{meteor.name}</div>
            <div>{meteor.mass}</div>
            <div>{meteor.year}</div>
          </div>
        )
      )}
    </div>
  )
}
