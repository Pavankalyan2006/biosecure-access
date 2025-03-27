
from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import random
import platform
import sys
import os

app = Flask(__name__)
# Configure CORS to allow requests from any origin
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Determine if we're on Windows and can potentially use Windows Hello
is_windows = platform.system() == 'Windows'
has_fingerprint_reader = False

# Try to import Windows-specific modules if on Windows
if is_windows:
    try:
        import win32com.client
        # Check if Windows Hello is available
        try:
            # This is a simplified check - in a real app, you'd use the Windows Biometric Framework API
            wbf_check = os.path.exists(os.path.join(os.environ['WINDIR'], 'System32', 'winbio.dll'))
            has_fingerprint_reader = wbf_check
            print(f"Windows Biometric Framework available: {has_fingerprint_reader}")
        except Exception as e:
            print(f"Error checking for Windows Hello: {e}")
    except ImportError:
        print("PyWin32 not available, Windows Hello integration disabled")

# In a real application, these would be more sophisticated modules
# with actual biometric processing capabilities
class FingerprintScanner:
    def __init__(self):
        self.has_hardware = has_fingerprint_reader
        print(f"Fingerprint scanner initialized. Hardware available: {self.has_hardware}")

    def verify(self, data):
        # If we have a fingerprint reader, we could attempt to use Windows Hello
        # In a real app, this would use the proper Windows APIs
        if self.has_hardware and is_windows:
            print("Attempting to use Windows Hello for fingerprint verification")
            try:
                # Simulate a Windows Hello prompt
                # In a real app, you would use the Windows Hello API
                # This is just a simulation for demonstration purposes
                print("Please scan your fingerprint on your device's reader")
                time.sleep(2)  # Give user time to scan
                
                # In a real implementation, this would verify the fingerprint
                # For demo, we'll return success most of the time
                return random.random() > 0.1
            except Exception as e:
                print(f"Error with Windows Hello: {e}")
                return False
        else:
            # Fall back to simulation if no hardware is available
            print("No fingerprint hardware detected, using simulation mode")
            time.sleep(2)  # Simulate processing time
            # Return True 90% of the time for demo purposes
            return random.random() > 0.1

class HeartbeatScanner:
    def verify(self, data):
        # In a real app, this would analyze heartbeat patterns
        time.sleep(2)  # Simulate processing time
        # Return True 90% of the time for demo purposes
        return random.random() > 0.1

class DNAAnalyzer:
    def verify(self, data):
        # In a real app, this would analyze DNA samples
        time.sleep(3)  # Simulate processing time
        # Return True 90% of the time for demo purposes
        return random.random() > 0.1

# Initialize our biometric processors
fingerprint_scanner = FingerprintScanner()
heartbeat_scanner = HeartbeatScanner()
dna_analyzer = DNAAnalyzer()

# Mock user database
users = {
    "user@example.com": {
        "password": "password123", 
        "fingerprint_id": "fp_12345",
        "heartbeat_pattern": "hb_12345",
        "dna_profile": "dna_12345"
    }
}

@app.route('/api/validate-credentials', methods=['POST', 'OPTIONS', 'HEAD'])
def validate_credentials():
    if request.method == 'OPTIONS' or request.method == 'HEAD':
        # Handle preflight requests
        response = jsonify({"status": "OK"})
        return response
        
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    # In a real app, you would check against a secure database
    # and use proper password hashing
    if email in users and users[email]['password'] == password:
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Invalid email or password"})

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint to verify the server is running"""
    fingerprint_status = "available" if has_fingerprint_reader else "unavailable"
    return jsonify({
        "status": "OK", 
        "message": "Biometric server is running",
        "fingerprint_reader": fingerprint_status,
        "platform": platform.system()
    })

@app.route('/api/biometric/fingerprint', methods=['POST', 'OPTIONS'])
def verify_fingerprint():
    if request.method == 'OPTIONS':
        # Handle preflight requests
        response = jsonify({"status": "OK"})
        return response
        
    data = request.json
    user_id = data.get('userId')
    
    # In a real app, you would retrieve the user's registered fingerprint
    # and compare it with the provided sample
    result = fingerprint_scanner.verify(data)
    return jsonify({
        "success": result, 
        "hardwareAvailable": has_fingerprint_reader,
        "platform": platform.system()
    })

@app.route('/api/biometric/heartbeat', methods=['POST', 'OPTIONS'])
def verify_heartbeat():
    if request.method == 'OPTIONS':
        # Handle preflight requests
        response = jsonify({"status": "OK"})
        return response
        
    data = request.json
    user_id = data.get('userId')
    
    # In a real app, you would retrieve the user's registered heartbeat pattern
    # and compare it with the provided sample
    result = heartbeat_scanner.verify(data)
    return jsonify({"success": result})

@app.route('/api/biometric/dna', methods=['POST', 'OPTIONS'])
def verify_dna():
    if request.method == 'OPTIONS':
        # Handle preflight requests
        response = jsonify({"status": "OK"})
        return response
        
    data = request.json
    user_id = data.get('userId')
    
    # In a real app, you would retrieve the user's registered DNA profile
    # and compare it with the provided sample
    result = dna_analyzer.verify(data)
    return jsonify({"success": result})

if __name__ == '__main__':
    print("Starting BioSecure Python Backend...")
    print("Server URL: http://localhost:5000")
    print("Default User: user@example.com / password123")
    print("Biometric processing services initialized.")
    print(f"Platform detected: {platform.system()}")
    print(f"Fingerprint reader detected: {has_fingerprint_reader}")
    print("API Endpoints:")
    print("  - GET /api/health")
    print("  - POST /api/validate-credentials")
    print("  - POST /api/biometric/fingerprint")
    print("  - POST /api/biometric/heartbeat")
    print("  - POST /api/biometric/dna")
    app.run(debug=True, port=5000, host='0.0.0.0')
