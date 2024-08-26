export const formatDateAsMonthYear = (dateStr: string) => {
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
  
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[parseInt(month, 10) - 1];
  
    return `${monthName} ${year}`;
  };