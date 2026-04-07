import { Tabs } from 'antd';
import { useState } from 'react';

import DestinationList from './controllers/destinationList';
import FilterBar from './controllers/filterBar';
import Itinerary from './controllers/itinerary';
import Budget from './controllers/budget';
import DestinationForm from './controllers/destinationForm';
import Report from './controllers/report';

import { destinations } from './data/storage';
import { filterDest } from './logic/logic';

const { TabPane } = Tabs;

export default function Thuchanh6() {

  const [list, setList] = useState(destinations);
  const [itinerary, setItinerary] = useState<any[]>([]);

  const handleFilter = (type: string) => {
    setList(filterDest(destinations, type));
  };
  
  const handleDelete = (id: number) => {
  const newList = list.filter((i:any) => i.id !== id);
  setList(newList);
  localStorage.setItem("destinations", JSON.stringify(newList));
  };

  const handleAdd = (d: any) => {
    setItinerary([d, ...itinerary]);
  };

  const handleRemove = (id: number) => {
    setItinerary(itinerary.filter(i => i.id !== id));
  };

  const handleAddDest = (d: any) => {
    const newList = [{ id: Date.now(), ...d }, ...list];
    setList(newList);
    localStorage.setItem("destinations", JSON.stringify(newList));
  };

  return (
    <div style={{ padding: 16 }}>
      <Tabs>

        <TabPane tab="Khám phá" key="1">
          <FilterBar onFilter={handleFilter} />
          <DestinationList data={list} onAdd={handleAdd} onDelete={handleDelete} />
        </TabPane>

        <TabPane tab="Lịch trình" key="2">
          <Itinerary list={itinerary} onRemove={handleRemove} />
          <Budget list={itinerary} />
        </TabPane>

        <TabPane tab="Admin" key="3">
          <DestinationForm onAdd={handleAddDest} />
        </TabPane>

        <TabPane tab="Báo cáo" key="4">
          <Report itineraries={itinerary} />
        </TabPane>

      </Tabs>
    </div>
  );
}