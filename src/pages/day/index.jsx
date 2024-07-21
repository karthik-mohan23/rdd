import React, { useState, useRef, useEffect } from "react";
import ActivityCard from "./ActivityCard";
import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Map from "react-map-gl";
import DropArea from "./DropArea";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2FydGhpazIzMTAiLCJhIjoiY2x5dnFzbGZnMTQ0MDJpcjRhOWY1ZTdyOSJ9.IhA833_l7FkNJeKeggnUGA";

const activityData = [
  {
    id: 1,
    title: "Trekking",
    location: "Manali",
    startTime: "4:00 AM",
    duration: "2h",
    category: "assigned",
  },
  {
    id: 2,
    title: "Boating",
    location: "Manali",
    startTime: "2:00 AM",
    duration: "1h",
    category: "unassigned",
  },
  {
    id: 3,
    title: "Swimming",
    location: "Manali",
    startTime: "5:00 AM",
    duration: "30 min",
    category: "assigned",
  },
];

function Day() {
  const [activities, setActivities] = useState(activityData);
  const [activeCard, setActiveCard] = useState(null);

  const assignedActivities = activities.filter(
    (card) => card.category === "assigned"
  );
  const unassignedActivities = activities.filter(
    (card) => card.category === "unassigned"
  );

  // map
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });
  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(-70.9);
  // const [lat, setLat] = useState(42.35);
  // const [zoom, setZoom] = useState(9);

  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v12",
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });
  // });

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
        <div className="flex-grow h-screen overscroll-y-auto px-8 pt-5">
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
        <div className="flex-grow md:block hidden h-screen overscroll-y-auto px-8 pt-5">
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
        <Map
          mapboxAccessToken="pk.eyJ1Ijoia2FydGhpazIzMTAiLCJhIjoiY2x5dnFzbGZnMTQ0MDJpcjRhOWY1ZTdyOSJ9.IhA833_l7FkNJeKeggnUGA"
          initialViewState={{
            longitude: -122.4,
            latitude: 37.8,
            zoom: 14,
          }}
          style={{ width: 600, height: 400 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
        />
        {/* <div
          ref={mapContainer}
          className=" hidden xl:block h-[85vh]   px-8 py-5 "></div> */}
      </div>
    </section>
  );
}

export default Day;
