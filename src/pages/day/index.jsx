import { useState } from "react";
import ActivityCard from "./ActivityCard";

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

  const assignedActivities = activities.filter(
    (card) => card.category === "assigned"
  );
  const unassignedActivities = activities.filter(
    (card) => card.category === "unassigned"
  );

  const handleDrop = (e, status) => {
    e.preventDefault();
    const id = parseInt(e.dataTransfer.getData("id"), 10);
    const updatedActivities = activities.map((task) =>
      task.id === id ? { ...task, category: status } : task
    );
    setActivities(updatedActivities);
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  return (
    <section>
      <div className="flex divide-x">
        <div
          onDrop={(e) => handleDrop(e, "assigned")}
          onDragOver={(e) => e.preventDefault()}
          className="flex-grow h-screen overscroll-y-auto px-8 pt-5  ">
          <h2 className=" text-slate-700 font-medium text-xl tracking-widest pb-5">
            Assigned Tasks
          </h2>
          <div className="space-y-5">
            {assignedActivities.map((item, index) => (
              <ActivityCard
                key={item.id}
                {...item}
                index={index}
                onDragStart={(e) => handleDragStart(e, item.id)}
                draggable
              />
            ))}
          </div>
        </div>
        <div
          onDrop={(e) => handleDrop(e, "unassigned")}
          onDragOver={(e) => e.preventDefault()}
          className="flex-grow md:block hidden h-screen overscroll-y-auto px-8 pt-5">
          <h2 className=" text-slate-700 font-medium text-xl tracking-widest pb-5">
            Unassigned Tasks
          </h2>
          <div className="space-y-5">
            {unassignedActivities.map((item, index) => (
              <ActivityCard
                key={item.id}
                {...item}
                index={index}
                onDragStart={(e) => handleDragStart(e, item.id)}
                draggable
              />
            ))}
          </div>
        </div>
        <div className="flex-grow hidden lg:block h-screen  px-8 py-5">
          <h2 className="">Map</h2>
        </div>
      </div>
    </section>
  );
}

export default Day;
