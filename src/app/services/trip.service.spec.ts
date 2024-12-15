import { TestBed } from '@angular/core/testing';
import { TripService } from './trip.service';

describe('TripService', () => {
  let service: TripService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of trips', (done) => {
    service.getTrips().subscribe(trips => {
      expect(trips.length).toBeGreaterThan(0);
      done();
    });
  });
});
