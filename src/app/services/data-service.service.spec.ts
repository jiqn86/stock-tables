import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DataServiceService } from './data-service.service';

describe('DataServiceService', () => {
  let dataService: DataServiceService;
  let httpService: HttpClient;

  beforeEach(() => {
    dataService = new DataServiceService(httpService);
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });
});
