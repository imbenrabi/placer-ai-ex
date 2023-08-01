import { queryMeteorsByYearAndMass, filterMeteorsByMassThresholdAtEarliestYear } from './queries';

describe('queryMeteorsByYearAndMass', () => {
  it('should return all meteors for the given year and massThreshold=null', () => {
    const params = { year: 1951, massThreshold: null };
    const result = queryMeteorsByYearAndMass(params);
    result.forEach((meteor) => {
      expect(meteor.year).toEqual(1951);
    })
  });
  it('should return meteors that match the year and massThreshold', () => {
    const params = { year: 1951, massThreshold: '500' };
    const result = queryMeteorsByYearAndMass(params);
    result.forEach((meteor) => {
      expect(meteor.year).toEqual(1951);
      expect(meteor.mass).toBeGreaterThan(500);
    });
  });
  it('should return all meteors if no params', () => {
    const params = { year: undefined, massThreshold: undefined };
    const result = queryMeteorsByYearAndMass(params);
    expect(result.length).toBeGreaterThan(1);
  })
});

describe('filterMeteorsByMassThresholdAtEarliestYear', () => {
  it('should return first year of occurence for specific mass', () => {
    const params = { massThreshold: '100000' };
    const result = filterMeteorsByMassThresholdAtEarliestYear(params);
    expect(result[0].year).toEqual(1400);
  });
  it('should return empty array for empty data', () => {
    const params = { massThreshold: '1000000000' };
    const result = filterMeteorsByMassThresholdAtEarliestYear(params);
    expect(result).toEqual([]);
  });
});
