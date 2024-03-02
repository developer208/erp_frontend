export default function displayTimeStamp(): string {
  // Create a Date object
  const currentDate = new Date();

  // Specify options for Indian time
  const options: any = {
    timeZone: "Asia/Kolkata", // Indian Standard Time (IST)
    hour12: false, // Use 24-hour format
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  // Format the date according to the specified options
  const indianFormattedDate = currentDate.toLocaleString("en-IN", options);

  // Output the formatted date
  const a = indianFormattedDate.toString().slice(0, 5);
  const b = a.split(":");
  console.log(b);
  let c = b[0] + b[1];
  if (Number(c) >= 0 && Number(c) <= 1159) {
    return "Good Morning";
  } else if (Number(c) >= 1200 && Number(c) <= 1759) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}
