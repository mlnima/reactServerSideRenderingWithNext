const getCurrentDatePath = () =>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();

    const paddedMonth = month.toString().padStart(2, '0');
    const paddedDay = day.toString().padStart(2, '0');

    return `${year}/${paddedMonth}/${paddedDay}`;
}

export default getCurrentDatePath;