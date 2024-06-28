export const DateFormate = (createdAt) => {
// Create a new Date object
const dateObj = new Date(createdAt);

// Extract date components
const year = dateObj.getFullYear();
const month = String(dateObj.getMonth() + 1).padStart(2, "0");
const day = String(dateObj.getDate()).padStart(2, "0");

// Format the date with hyphens
const formattedDate = `${year}-${month}-${day}`;

// Get the time component
const time = dateObj.toLocaleTimeString(); // Format the time

// Concatenate date and time
const formattedDateTime = `${formattedDate} ${time}`;
return formattedDateTime
}