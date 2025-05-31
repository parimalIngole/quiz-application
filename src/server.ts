import 'reflect-metadata';
import app from './app';

// Define the port to run the server on, defaulting to 3000 if not provided in the environment
const PORT = process.env.PORT || 3000;
// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));