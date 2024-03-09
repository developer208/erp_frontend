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
  let d = "";
  let valid = true;
  for (let i = 0; i < c.length; i++) {
    if (c[i] === "0" && valid) {
      continue;
    } else {
      d = d + c[i];
      valid = false;
    }
  }
  if (d === "" || (Number(d) >= 0 && Number(d) <= 1159)) {
    return "Good Morning";
  } else if (Number(d) >= 1200 && Number(d) <= 1759) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}
