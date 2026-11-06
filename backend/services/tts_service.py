
import os

from dotenv import load_dotenv
from elevenlabs import VoiceSettings
from elevenlabs.client import ElevenLabs

load_dotenv()

API_KEY = os.getenv("ELEVENLABS_API_KEY")

if not API_KEY:
    raise ValueError("ELEVENLABS_API_KEY is not set in the .env file")

client = ElevenLabs(api_key=API_KEY)


def generate_speech(
    text: str,
    voice_id: str,
    speed: float = 1.0,
    language_code: str = "en",
    style: float = 0.0,
    model_id: str = "eleven_multilingual_v2",
):
    """Generate speech using ElevenLabs."""

    speed = max(0.7, min(1.2, float(speed)))
    style = max(0.0, min(1.0, float(style)))

    audio = client.text_to_speech.convert(
        voice_id=voice_id,
        model_id=model_id,
        text=text,
        language_code=language_code,
        output_format="mp3_44100_128",
        voice_settings=VoiceSettings(
            stability=0.5,
            similarity_boost=0.75,
            style=style,
            use_speaker_boost=True,
            speed=speed,
        ),
    )

    return b"".join(audio)
