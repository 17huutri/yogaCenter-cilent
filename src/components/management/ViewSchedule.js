import React from "react";
const Schedule  = () => {
    return(<h1 className="text-center"><div class="container mx-auto py-8">
    <h1 class="text-2xl font-bold mb-4">Schedule</h1>
    <div class="grid grid-cols-3 gap-4">
      <div class="bg-gray-200 p-4">
        <h2 class="text-lg font-bold mb-2">Monday</h2>
        <ul>
          <li class="mb-1">9:00 AM - Meeting</li>
          <li class="mb-1">11:00 AM - Presentation</li>
          <li class="mb-1">2:00 PM - Workshop</li>
        </ul>
      </div>
      <div class="bg-gray-200 p-4">
        <h2 class="text-lg font-bold mb-2">Tuesday</h2>
        <ul>
          <li class="mb-1">10:00 AM - Training</li>
          <li class="mb-1">1:00 PM - Lunch</li>
          <li class="mb-1">3:00 PM - Project Review</li>
        </ul>
      </div>
      <div class="bg-gray-200 p-4">
        <h2 class="text-lg font-bold mb-2">Wednesday</h2>
        <ul>
          <li class="mb-1">9:00 AM - Team Meeting</li>
          <li class="mb-1">11:00 AM - Client Call</li>
          <li class="mb-1">2:00 PM - Design Review</li>
        </ul>
      </div>
    </div>
  </div></h1>)
}
export default Schedule;