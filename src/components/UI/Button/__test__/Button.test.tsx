import React from 'react';

import {render} from '../../../../utils/testUtils';
import { Button } from '../Button';

describe('<Button />', () => {
  it('the component rendered', () => {
    render(
      <Button title="button title" />
    );
  });
});
