import { describe } from 'mocha';
import assert from 'assert';

import { chunkArray } from '.';

const arrayChunk = [
  [
    {
      'First Name': 'Roseann',
      'Last Name': 'Parker',
      'Company': 'Zaggles',
      'Employed': 'No',
    },
    {
      'First Name': 'Ford',
      'Last Name': 'Knox',
      'Company': 'Coriander',
      'Employed': 'Yes',
    },
    {
      'First Name': 'Graves',
      'Last Name': 'Randolph',
      'Company': 'Supremia',
      'Employed': 'No',
    },
    {
      'First Name': 'Sears',
      'Last Name': 'Jackson',
      'Company': 'Netagy',
      'Employed': 'No',
    },
  ],
  [
    {
      'First Name': 'Bernard',
      'Last Name': 'Barrett',
      'Company': 'Cubix',
      'Employed': 'No',
    },
    {
      'First Name': 'Tami',
      'Last Name': 'Snider',
      'Company': 'Lunchpod',
      'Employed': 'Yes',
    },
    {
      'First Name': 'Holt',
      'Last Name': 'Murphy',
      'Company': 'Eventage',
      'Employed': 'No',
    },
    {
      'First Name': 'Elizabeth',
      'Last Name': 'Rice',
      'Company': 'Deminimum',
      'Employed': 'Yes',
    },
  ],
  [
    {
      'First Name': 'Herring',
      'Last Name': 'Mccray',
      'Company': 'Waretel',
      'Employed': 'No',
    },
    {
      'First Name': 'Wynn',
      'Last Name': 'Randall',
      'Company': 'Animalia',
      'Employed': 'No',
    },
    {
      'First Name': 'Briana',
      'Last Name': 'Rivas',
      'Company': 'Dancerity',
      'Employed': 'No',
    },
    {
      'First Name': 'Jerry',
      'Last Name': 'Carey',
      'Company': 'Silodyne',
      'Employed': 'Yes',
    },
  ],
  [
    {
      'First Name': 'Christa',
      'Last Name': 'Buckner',
      'Company': 'Bugsall',
      'Employed': 'Yes',
    },
    {
      'First Name': 'Helene',
      'Last Name': 'Kinney',
      'Company': 'Xylar',
      'Employed': 'No',
    },
  ],
];

const array = [
  {
    'First Name': 'Roseann',
    'Last Name': 'Parker',
    'Company': 'Zaggles',
    'Employed': 'No',
  },
  {
    'First Name': 'Ford',
    'Last Name': 'Knox',
    'Company': 'Coriander',
    'Employed': 'Yes',
  },
  {
    'First Name': 'Graves',
    'Last Name': 'Randolph',
    'Company': 'Supremia',
    'Employed': 'No',
  },
  {
    'First Name': 'Sears',
    'Last Name': 'Jackson',
    'Company': 'Netagy',
    'Employed': 'No',
  },
  {
    'First Name': 'Bernard',
    'Last Name': 'Barrett',
    'Company': 'Cubix',
    'Employed': 'No',
  },
  {
    'First Name': 'Tami',
    'Last Name': 'Snider',
    'Company': 'Lunchpod',
    'Employed': 'Yes',
  },
  {
    'First Name': 'Holt',
    'Last Name': 'Murphy',
    'Company': 'Eventage',
    'Employed': 'No',
  },
  {
    'First Name': 'Elizabeth',
    'Last Name': 'Rice',
    'Company': 'Deminimum',
    'Employed': 'Yes',
  },
  {
    'First Name': 'Herring',
    'Last Name': 'Mccray',
    'Company': 'Waretel',
    'Employed': 'No',
  },
  {
    'First Name': 'Wynn',
    'Last Name': 'Randall',
    'Company': 'Animalia',
    'Employed': 'No',
  },
  {
    'First Name': 'Briana',
    'Last Name': 'Rivas',
    'Company': 'Dancerity',
    'Employed': 'No',
  },
  {
    'First Name': 'Jerry',
    'Last Name': 'Carey',
    'Company': 'Silodyne',
    'Employed': 'Yes',
  },
  {
    'First Name': 'Christa',
    'Last Name': 'Buckner',
    'Company': 'Bugsall',
    'Employed': 'Yes',
  },
  {
    'First Name': 'Helene',
    'Last Name': 'Kinney',
    'Company': 'Xylar',
    'Employed': 'No',
  },
];

describe('dataGridUtils', () => {
  describe('#chunkArray()', () => {
    it('should return array chunks of given size', () => {
      assert.deepEqual((chunkArray(array, 4)), arrayChunk);
    });
  });
});
