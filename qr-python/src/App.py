from flask import Flask, request, send_file, jsonify
import qrcode
from io import BytesIO

app = Flask(__name__)

@app.route('/generate-qr', methods=['POST'])
def generate_qr():
    # Get the text data from the request JSON
    data = request.json.get('text')
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    # Generate QR code
    qr = qrcode.make(data)
    buffer = BytesIO()
    qr.save(buffer, format="PNG")
    buffer.seek(0)

    # Return the QR code image as a response
    return send_file(buffer, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
