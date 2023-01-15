import React from 'react';

import { useSelector } from 'react-redux';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import Channel from './Channel.jsx';

const Channels = () => {
  const channelsState = useSelector(channelsSelectors.selectAll);
  return (
    <div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channelsState.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            <Channel key={channel.id} channel={channel} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
