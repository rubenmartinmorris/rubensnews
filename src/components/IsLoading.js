import React from 'react';
import { Card } from 'react-bootstrap';

export const IsLoading = () => {
  return (
    <Card className='mt-2'>
      <Card.Body className='d-flex justify-content-center'>
        <div className='lds-dual-ring '></div>
      </Card.Body>
    </Card>
  );
};
