export function createBooking(bookings: any[], newBooking: any, employees: any[]) {

  const employee = employees.find(e => e.id === newBooking.employeeId);

  const isConflict = bookings.some(b =>
    b.employeeId === newBooking.employeeId &&
    b.date === newBooking.date &&
    b.time === newBooking.time
  );

  if (isConflict) throw new Error("Trùng lịch!");

  const count = bookings.filter(b =>
    b.employeeId === newBooking.employeeId &&
    b.date === newBooking.date
  ).length;

  if (count >= employee.maxPerDay) {
    throw new Error("Nhân viên đã đủ lịch!");
  }

  return {
    ...newBooking,
    id: Date.now(),
    status: "Chờ duyệt"
  };
}


export function countByDate(bookings: any[]) {
  const result: any = {};

  bookings.forEach(b => {
    if (!result[b.date]) result[b.date] = 0;
    result[b.date]++;
  });

  return result;
}

export function countByMonth(bookings: any[]) {
  const result: any = {};

  bookings.forEach(b => {
    const month = b.date.slice(0, 7);
    if (!result[month]) result[month] = 0;
    result[month]++;
  });

  return result;
}

export function revenueByService(bookings: any[], services: any[]) {
  const result: any = {};

  bookings.forEach(b => {
    if (b.status !== "Hoàn thành") return;

    const service = services.find(s => s.id === b.serviceId);
    if (!service) return;

    if (!result[service.name]) result[service.name] = 0;
    result[service.name] += service.price;
  });

  return result;
}

export function revenueByEmployee(bookings: any[], services: any[], employees: any[]) {
  const result: any = {};

  bookings.forEach(b => {
    if (b.status !== "Hoàn thành") return;

    const emp = employees.find(e => e.id === b.employeeId);
    const service = services.find(s => s.id === b.serviceId);

    if (!emp || !service) return;

    if (!result[emp.name]) result[emp.name] = 0;
    result[emp.name] += service.price;
  });

  return result;
}

export function addRating(ratings: any[], booking: any, data: any) {

  if (booking.status !== "Hoàn thành") {
    throw new Error("Chỉ được đánh giá khi đã hoàn thành!");
  }

  const existed = ratings.find(r => r.bookingId === booking.id);
  if (existed) {
    throw new Error("Lịch này đã được đánh giá rồi!");
  }

  return {
    id: Date.now(),
    bookingId: booking.id,
    employeeId: booking.employeeId,
    score: data.score,
    comment: data.comment,
    reply: ""
  };
}

export function replyRating(ratings: any[], id: number, reply: string) {
  return ratings.map(r =>
    r.id === id ? { ...r, reply } : r
  );
}

export function avgRating(ratings: any[], employeeId: number) {
  const list = ratings.filter(r => r.employeeId === employeeId);
  if (list.length === 0) return 0;

  const total = list.reduce((sum, r) => sum + r.score, 0);
  return (total / list.length).toFixed(1);
}