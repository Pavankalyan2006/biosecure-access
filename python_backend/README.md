
# BioSecure Python Backend

This is a Flask-based backend for the BioSecure application that processes biometric data for authentication.

## Setup Instructions

1. Make sure you have Python 3.7+ installed

2. Install the required packages:
```
pip install -r requirements.txt
```

3. Run the application:
```
python app.py
```

The server will start on http://localhost:5000

## API Endpoints

- `POST /api/validate-credentials` - Validates user email and password
- `POST /api/biometric/fingerprint` - Processes fingerprint data
- `POST /api/biometric/heartbeat` - Processes heartbeat data
- `POST /api/biometric/dna` - Processes DNA data

## Testing the Server

The frontend will automatically detect if the server is running. If not, it will fallback to demo mode.

### Default Credentials
- Email: `user@example.com`
- Password: `password123`

## CORS Support

This server has CORS enabled, so it can receive requests from different origins (like your React app).

## Next Steps for Production

For a production environment, you would want to:

1. Use a proper database for user storage
2. Implement secure password hashing
3. Add proper authentication tokens
4. Implement actual biometric processing libraries
5. Add HTTPS for secure communication
6. Deploy to a production server
