
from flask import Blueprint, request, jsonify, send_file
from services.tts_service import generate_speech

import io

tts_bp = Blueprint("tts", __name__)


# UI language names mapped to language codes
LANGUAGE_MAP = {
    "English (US)": "en",
    "English (UK)": "en",
    "Hindi": "hi",
}

# UI speaking styles mapped to ElevenLabs style intensity
STYLE_MAP = {
    "Natural": 0.0,
    "Professional": 0.2,
    "Friendly": 0.5,
    "Expressive": 0.8,
}


@tts_bp.route("/api/voices", methods=["GET"])
def get_voices():
    return jsonify({
        "success": True,
        "message": "Voice IDs are configured in the application."
    })


@tts_bp.route("/api/tts", methods=["POST"])
def text_to_speech():
    try:
        data = request.get_json(silent=True)

        if not data:
            return jsonify({
                "success": False,
                "error": "Request body is required."
            }), 400

        text = data.get("text", "").strip()
        voice_id = data.get("voice")

        language = data.get("language", "English (US)")
        speaking_style = data.get("style", "Natural")

        try:
            speed = float(data.get("speed", 1.0))
        except (TypeError, ValueError):
            return jsonify({
                "success": False,
                "error": "Invalid speech speed."
            }), 400

        if not text:
            return jsonify({
                "success": False,
                "error": "Text cannot be empty."
            }), 400

        if not voice_id:
            return jsonify({
                "success": False,
                "error": "Voice ID is required."
            }), 400

        if len(text) > 5000:
            return jsonify({
                "success": False,
                "error": "Text cannot exceed 5000 characters."
            }), 400

        if language not in LANGUAGE_MAP:
            return jsonify({
                "success": False,
                "error": "Unsupported language selected."
            }), 400

        if speaking_style not in STYLE_MAP:
            return jsonify({
                "success": False,
                "error": "Unsupported speaking style selected."
            }), 400

        speed = max(0.7, min(1.2, speed))

        audio_data = generate_speech(
            text=text,
            voice_id=voice_id,
            speed=speed,
            language_code=LANGUAGE_MAP[language],
            style=STYLE_MAP[speaking_style],
        )

        return send_file(
            io.BytesIO(audio_data),
            mimetype="audio/mpeg",
            as_attachment=False,
            download_name="vocalis-speech.mp3",
        )

    except Exception as e:
        print("TTS Error:", repr(e))

        return jsonify({
            "success": False,
            "error": str(e),
        }), 500
