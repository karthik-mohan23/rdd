import { MapPin } from "lucide-react";
import { AlarmClock } from "lucide-react";
import { Clock } from "lucide-react";

function ActivityCard({
  id,
  title,
  index,
  location,
  startTime,
  duration,
  onDragStart,
  category,
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-white drop-shadow-md text-slate-800 w-[280px] pb-2 rounded-sm hover:drop-shadow-xl flex flex-col gap-2 cursor-pointer p-2">
      {/* blue container */}
      <div className="bg-cyan-200 flex items-center justify-between p-2">
        <div className="">
          <h5 className=" text-sm text-slate-600/50 font-semibold">Activity</h5>
          <h6>{title}</h6>
        </div>
        {category === "assigned" && (
          <div className="flex justify-between pe-1">
            <p className=" bg-pink-600/90 text-xs w-6 h-6 rounded-full flex justify-center items-center text-white font-semibold ">
              {index + 1}
            </p>
          </div>
        )}
      </div>
      {/* location */}
      <div className="px-1 text-slate-500 bg-slate-100/80 flex gap-1 items-center">
        <MapPin size={16} />
        <p>{location}</p>
      </div>
      {/* time */}
      <div className="flex justify-between px-1">
        <div className="flex gap-1 items-center">
          <AlarmClock size={16} />
          <p>{startTime}</p>
        </div>
        <div className="flex gap-1 items-center">
          <Clock size={16} />
          <p>{duration}</p>
        </div>
      </div>
    </div>
  );
}
export default ActivityCard;
