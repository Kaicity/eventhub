import React from 'react';
import CardComponent from './CardComponent';
import TextComponent from './TextComponent';
import {appInfo} from '../constants/appInfos';

interface Props {
  item: any;
  type: 'card' | 'list';
}

const EventItemComponent = (props: Props) => {
  const {item, type} = props;
  return (
    <CardComponent
      onPress={() => {}}
      styles={{width: appInfo.sizes.WIDTH * 0.6}}>
      <TextComponent
        size={18}
        text="International Band Music Concert"
        title
        numberOfLine={1}
      />
    </CardComponent>
  );
};

export default EventItemComponent;
