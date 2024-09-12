export const formatDateAsMonthYear = (dateStr: string) => {
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  
  const monthNames = [
    "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
    "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
  ];

  const monthName = monthNames[parseInt(month, 10) - 1];
  
  return `${monthName} ${year}`;
};

export const isExpired = (cachedDate: Date, expireInTime: number) => {
  const cacheTimestamp = new Date(cachedDate).getTime(); // Convert ISO string to timestamp
  const now = Date.now();

  return now - cacheTimestamp > expireInTime;
};
