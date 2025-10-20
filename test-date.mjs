import { format } from 'date-fns';

// Simulate the date parsing that happens in content.config.ts
const dateString = '2025-10-20';
const originalDate = new Date(dateString);
const fixedDate = new Date(
  originalDate.getUTCFullYear(),
  originalDate.getUTCMonth(),
  originalDate.getUTCDate()
);

console.log('Original date string:', dateString);
console.log('Parsed as Date (UTC):', originalDate.toISOString());
console.log('Original formatted:', format(originalDate, 'MMMM dd, yyyy'));
console.log('Fixed date:', fixedDate.toISOString());
console.log('Fixed formatted:', format(fixedDate, 'MMMM dd, yyyy'));
console.log('Timezone offset (minutes):', originalDate.getTimezoneOffset());
