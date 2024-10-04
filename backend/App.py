from flask import Flask, request, jsonify
from flask_cors import CORS
import qrcode
import io
import base64
import traceback
import logging

app = Flask(__name__)
CORS(app, resources={r"/generate-qr": {"origins": "http://localhost:5173"}}, supports_credentials=True)

@app.route("/generate-qr", methods=["POST"])
def generate_qr():
    try:
        data = request.json.get("data")
        if not data:
            return jsonify({"error": "No data provided"}), 400

        # Generate QR code
        img = qrcode.make(data)
        img_buffer = io.BytesIO()
        img.save(img_buffer, format="PNG")
        img_str = base64.b64encode(img_buffer.getvalue()).decode("utf-8")

        return jsonify({"qr_code": img_str}), 200
    except Exception as e:
        error_message = f"An error occurred: {str(e)}\n{traceback.format_exc()}"
        logging.error(error_message)
        return jsonify({"error": "An internal server error occurred. Please check the server logs."}), 500

if __name__ == "__main__":
    logging.basicConfig(level=logging.ERROR)
    app.run(debug=True)
