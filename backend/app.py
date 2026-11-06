from flask import Flask, jsonify
from flask_cors import CORS
from routes.tts_routes import tts_bp

app = Flask(__name__)

CORS(app)

# Register TTS routes
app.register_blueprint(tts_bp)


@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "success": True,
        "message": "Vocalis backend is running",
        "status": "healthy"
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)