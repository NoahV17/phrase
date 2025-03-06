import os
import csv
import speech_recognition as sr
import spacy

from django.conf import settings
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from pydub import AudioSegment
from django.shortcuts import render

# Create your views here.
nlp = spacy.load("en_core_web_sm")

def translate_phrase(phrase):
    """
    Dummy translation function.
    In a production system, integrate with a translation API (e.g., Google Cloud Translation).
    """
    return phrase + " (translated)"

@csrf_exempt  # For testing—ensure proper CSRF protection in production!
def transcribe_audio(request):
    if request.method == "POST":
        # Get the audio file from the POST request
        audio_file = request.FILES.get("audio")
        if not audio_file:
            return JsonResponse({"error": "No audio file provided"}, status=400)
        
        # Save the uploaded file temporarily
        temp_file_path = os.path.join(settings.BASE_DIR, "temp_audio.wav")
        with open(temp_file_path, "wb+") as destination:
            for chunk in audio_file.chunks():
                destination.write(chunk)
        
        # Optionally, convert the file to WAV using pydub if needed:
        # (Uncomment the next three lines if the file is not already WAV.)
        # audio = AudioSegment.from_file(temp_file_path)
        # audio.export(temp_file_path, format="wav")
        
        # Initialize the recognizer and process the audio file
        recognizer = sr.Recognizer()
        try:
            with sr.AudioFile(temp_file_path) as source:
                audio_data = recognizer.record(source)
            # Transcribe using Google Web Speech API
            transcription = recognizer.recognize_google(audio_data)
        except Exception as e:
            os.remove(temp_file_path)
            return JsonResponse({"error": f"Transcription failed: {str(e)}"}, status=500)
        
        # Process the transcription with spaCy to break it into sentences and key phrases
        doc = nlp(transcription)
        sentences = [sent.text for sent in doc.sents]
        
        # Extract key phrases (for simplicity, using noun chunks)
        key_phrases = [chunk.text for chunk in doc.noun_chunks]
        
        # Build flashcards by pairing each key phrase with its translation
        flashcards = []
        for phrase in key_phrases:
            translation = translate_phrase(phrase)
            flashcards.append({"native": phrase, "translation": translation})
        
        # Clean up the temporary file
        os.remove(temp_file_path)
        
        # Check if the client requested CSV output
        if request.GET.get("csv", "false").lower() == "true":
            # Create a CSV file in memory
            response = HttpResponse(content_type="text/csv")
            response["Content-Disposition"] = 'attachment; filename="flashcards.csv"'
            
            writer = csv.writer(response)
            writer.writerow(["Native Phrase", "Translation"])  # Header row
            for card in flashcards:
                writer.writerow([card["native"], card["translation"]])
            return response
        
        # Return a JSON response with the transcription, sentences, key phrases and flashcards
        return JsonResponse({
            "transcription": transcription,
            "sentences": sentences,
            "key_phrases": key_phrases,
            "flashcards": flashcards,
        })
    else:
        return JsonResponse({"error": "POST method required"}, status=405)