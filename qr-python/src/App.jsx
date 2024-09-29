import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests

function App() {
  const [value, setValue] = useState("");
  const [qrCode, setQrCode] = useState(null);

  const handler = async (e) => {
    e.preventDefault();
    if (value.trim() === "") {
      alert("Please enter a valid text!");
      return;
    }

    try {
      // Make a POST request to the Python backend
      const response = await axios.post("http://127.0.0.1:5000/generate-qr", { text: value }, {
        responseType: 'blob', // Set the response type to blob to handle images
      });

      // Create a URL for the image
      const qrCodeUrl = URL.createObjectURL(response.data);
      setQrCode(qrCodeUrl);
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("Failed to generate QR code. Please try again.");
    }
  };

  return (
    <div className="w-full min-h-screen grid place-content-center bg-[#181818]">
      <div className="w-[23rem] p-7 space-y-8 text-slate-300">
        <h1 className="text-2xl font-semibold text-center text-slate-100">
          QR Code Generator
        </h1>

        {qrCode ? (
          <img src={qrCode} alt="Generated QR Code" className="w-full h-auto" />
        ) : (
          <div className="w-full h-[18rem] border border-neutral-200 rounded-3xl grid place-content-center bg-[#202020]"></div>
        )}

        <form className="space-y-2" onSubmit={handler}>
          <div>
            <input
              aria-label="QR code input"
              className="bg-[#252525] rounded w-full p-2 focus:outline outline-neutral-300"
              placeholder="Transform your text into a QR code"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button
            aria-label="Create QR code"
            className={`w-full py-3 flex justify-center bg-[#252525] hover:bg-neutral-600 duration-200 rounded ${
              value.length === 0 ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={value.length === 0}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
