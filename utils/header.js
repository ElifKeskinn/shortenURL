const apikey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmcWxyaHR0aG93ZWNncHJwY21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgxMTk2MTQsImV4cCI6MjA0MzY5NTYxNH0.eZH_z3rlRdABDzIAVja3q-Z3sNUw84EK6K6s42_6aHY";

export const defaultHeader = {
  apikey: apikey,
  Authorization: `Bearer ${apikey}`,
  "Content-Type": "application/json",
};
