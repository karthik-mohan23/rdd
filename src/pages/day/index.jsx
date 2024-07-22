import React, { useState } from "react";
import ActivityCard from "./ActivityCard";
import DropArea from "./DropArea";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";

const activityData = [
  {
    id: 1,
    title: "Trekking",
    startTime: "4:00 AM",
    duration: "2h",
    category: "assigned",
    place: {
      key: "operaHouse",
      location: { lat: -33.8567844, lng: 151.213108 },
    },
  },
  {
    id: 2,
    title: "Boating",
    startTime: "2:00 AM",
    duration: "1h",
    category: "unassigned",
    place: {
      key: "tarongaZoo",
      location: { lat: -33.8472767, lng: 151.2188164 },
    },
  },
  {
    id: 3,
    title: "Swimming",
    startTime: "5:00 AM",
    duration: "30 min",
    category: "assigned",
    place: {
      key: "hyderPark",
      location: { lat: -33.8690081, lng: 151.2052393 },
    },
  },
];

function PoiMarkers({ locations }) {
  return (
    <>
      {locations.map((poi, index) => (
        <AdvancedMarker key={poi.key} position={poi.location}>
          <div className="bg-cyan-200 rounded-full w-10 h-10 border-4 flex justify-center items-center border-black">
            {index + 1}
          </div>
        </AdvancedMarker>
      ))}
    </>
  );
}

function Day() {
  const [activities, setActivities] = useState(activityData);
  const [activeCard, setActiveCard] = useState(null);

  const assignedActivities = activities.filter(
    (card) => card.category === "assigned"
  );
  const unassignedActivities = activities.filter(
    (card) => card.category === "unassigned"
  );

  const locationsArr = assignedActivities.map((activity) => activity.place);

  const onDrop = (status, position) => {
    console.log(
      `${activeCard} is going to be placed into ${status} and at the position ${position}`
    );

    if (activeCard === null || activeCard === undefined) {
      return;
    }

    // Find the activity to move using the activeCard index
    const activityToMove = activities.find(
      (activity) => activity.id === activeCard
    );

    // Remove the activity from its current position
    const updatedActivities = activities.filter(
      (activity) => activity.id !== activeCard
    );

    // Add the activity to the new position with the updated category
    updatedActivities.splice(position, 0, {
      ...activityToMove,
      category: status,
    });

    setActivities(updatedActivities);
  };

  const handleDragStart = (id) => {
    setActiveCard(id);
  };

  const handleDragStop = () => {
    setActiveCard(null);
  };

  return (
    <section>
      <div className="flex divide-x w-[90%] mx-auto overscroll-x-none">
        <div className="w-[33.33%] h-screen overscroll-y-auto px-8 pt-5">
          <h2 className="text-slate-700 font-medium text-xl tracking-widest pb-5">
            Assigned Tasks
          </h2>
          <div className="space-y-5 h-full">
            <DropArea onDrop={onDrop} status="assigned" position={0} />
            {assignedActivities.map((item, index) => (
              <React.Fragment key={item.id}>
                <ActivityCard
                  key={item.id}
                  {...item}
                  index={index}
                  onDragStart={() => handleDragStart(item.id)}
                  onDragEnd={handleDragStop}
                  draggable
                />
                <DropArea
                  onDrop={onDrop}
                  status="assigned"
                  position={index + 1}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="w-[33.33%] md:block hidden h-screen overscroll-y-auto px-8 pt-5">
          <h2 className="text-slate-700 font-medium text-xl tracking-widest pb-5">
            Unassigned Tasks
          </h2>
          <div className="space-y-5 h-full">
            <DropArea onDrop={onDrop} status="unassigned" position={0} />
            {unassignedActivities.map((item, index) => (
              <React.Fragment key={item.id}>
                <ActivityCard
                  key={item.id}
                  {...item}
                  index={index}
                  onDragStart={() => handleDragStart(item.id)}
                  onDragEnd={handleDragStop}
                  draggable
                />
                <DropArea
                  onDrop={onDrop}
                  status="unassigned"
                  position={index + 1}
                />
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="w-[33.33%] py-5">
          <APIProvider apiKey={import.meta.env.VITE_MAP_KEY}>
            <Map
              defaultZoom={13}
              defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
              mapId={import.meta.env.VITE_MAP_ID}
              onCameraChanged={(ev) =>
                console.log(
                  "camera changed:",
                  ev.detail.center,
                  "zoom:",
                  ev.detail.zoom
                )
              }>
              <PoiMarkers locations={locationsArr} />
            </Map>
          </APIProvider>
        </div>
      </div>
    </section>
  );
}

export default Day;
