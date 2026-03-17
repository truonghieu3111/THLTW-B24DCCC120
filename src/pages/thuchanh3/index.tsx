import { useState } from 'react';

// data
import { employees, services, bookings as initBookings, ratings } from './data/storage';

// logic
import { createBooking, addRating, replyRating } from './logic/logic';

// controllers
import BookingControl from './controllers/bookingControl';
import BookingList from './controllers/bookingList';
import EmployeeList from './controllers/employeeList';
import ServiceList from './controllers/serviceList';
import RatingControl from './controllers/ratingControl';
import RatingList from './controllers/ratingList';
import Report from './controllers/report';

export default function Thuchanh3() {

  const [list, setList] = useState(initBookings);

  // tạo lịch hẹn
  const handleCreate = (data: any) => {
    try {
      const newBooking = createBooking(list, data, employees);

      const newList = [newBooking, ...list];

      setList(newList);

      localStorage.setItem("bookings", JSON.stringify(newList));

    } catch (err: any) {
      alert(err.message);
    }
  };
  const [ratingList, setRatingList] = useState(ratings);
  const handleAddRating = (data: any) => {

  try {
    const booking = list.find(b => b.id === data.bookingId);

    const newRating = addRating(ratingList, booking, data);

    const newList = [newRating, ...ratingList];

    setRatingList(newList);

    localStorage.setItem("ratings", JSON.stringify(newList));

  } catch (err: any) {
    alert(err.message);
  }
};

const handleReply = (id: number, reply: string) => {
  const newList = replyRating(ratingList, id, reply);

  setRatingList(newList);

  localStorage.setItem("ratings", JSON.stringify(newList));
};
  const handleComplete = (id: number) => {

  const newList = list.map(b =>
    b.id === id ? { ...b, status: "Hoàn thành" } : b
  );

  setList(newList);

  localStorage.setItem("bookings", JSON.stringify(newList));
};

  return (
    <div style={{ padding: 20 }}>

      {/* Nhân viên */}
      <h2>Nhân viên</h2>
      <EmployeeList employees={employees} />

      {/* Dịch vụ */}
      <h2>Dịch vụ</h2>
      <ServiceList services={services} />

      {/* Đặt lịch */}
      <h2>Đặt lịch</h2>
      <BookingControl
        employees={employees}
        services={services}
        onCreate={handleCreate}
      />

      {/* Danh sách lịch */}
      <BookingList 
          bookings={list}
          onComplete={handleComplete} 
      />

      {/* Đánh giá */}
      <h2>Đánh giá</h2>

      <RatingControl bookings={list} onAdd={handleAddRating} />

      <RatingList
        ratings={ratingList}
        employees={employees}
        onReply={handleReply}
      />

      
      {/* Báo cáo */}
      <h2>Thống kê & báo cáo</h2>

      <Report
        bookings={list}
        services={services}
        employees={employees}X
      />

    </div>
  );
} 