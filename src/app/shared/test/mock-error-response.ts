import { HttpErrorResponse } from '@angular/common/http';

export const mockErrorResponse = new HttpErrorResponse({
  error: {
    status_message: 'Error Message',
    status_code: 400,
  },
  statusText: 'Not found',
  status: 404,
  url: 'test.com',
});
