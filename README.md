# Matrix Tools Hub 🚀

A professional Matrix-themed web application that provides three powerful tools: Text-to-Audio conversion, Image-to-PDF conversion, and PDF merging. Built with HTML, CSS, and JavaScript with a stunning Matrix rain animation and modern UI.

![Matrix Tools Hub](https://img.shields.io/badge/Matrix-Tools%20Hub-00ff41?style=for-the-badge&logo=matrix)

## ✨ Features

- **🎵 Text to Audio**: Convert text to speech with customizable voice and speed settings
- **📄 Image to PDF**: Transform multiple images into a single PDF document
- **🔗 PDF Merge**: Combine multiple PDF files into one seamless document
- **🎬 Matrix Rain Animation**: Immersive background animation
- **📱 Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **🎨 Professional UI**: Matrix-themed design with smooth animations
- **⚡ Easy API Integration**: Simple configuration for your preferred APIs

## 🚀 Quick Start

1. **Download or clone the files**
2. **Open `index.html` in your browser**
3. **Start using the tools with simulated responses**
4. **Configure APIs for real functionality** (see API Setup below)

## 📁 File Structure

```
matrix-tools-hub/
├── index.html          # Main HTML structure
├── styles.css          # Matrix-themed CSS with animations
├── script.js           # JavaScript functionality and UI interactions
├── config.js           # API configuration and settings
└── README.md           # This file
```

## 🛠️ API Setup

### Step 1: Choose Your APIs

The application supports various APIs for each tool. Here are some popular options:

#### Text to Audio APIs
- **OpenAI** (Recommended): `https://api.openai.com/v1/audio/speech`
- **ElevenLabs**: `https://api.elevenlabs.io/v1/text-to-speech`
- **Google Cloud TTS**: `https://texttospeech.googleapis.com/v1/text:synthesize`
- **Azure Cognitive Services**: `https://[region].tts.speech.microsoft.com/cognitiveservices/v1`

#### Image to PDF APIs
- **ConvertAPI**: `https://v2.convertapi.com/convert/jpg/to/pdf`
- **PDF.co**: `https://api.pdf.co/v1/pdf/convert/from/image`
- **CloudConvert**: `https://api.cloudconvert.com/v2/jobs`

#### PDF Merge APIs
- **PDF.co**: `https://api.pdf.co/v1/pdf/merge`
- **CloudConvert**: `https://api.cloudconvert.com/v2/jobs`
- **PDFShift**: `https://api.pdfshift.io/v3/convert/pdf`

### Step 2: Configure APIs

Edit `config.js` file and replace the placeholder values:

```javascript
// Replace these placeholders with your actual API details
textToAudio: {
    endpoint: 'https://api.openai.com/v1/audio/speech', // Your actual endpoint
    key: 'sk-your-actual-api-key-here',                // Your actual API key
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-your-actual-api-key-here'
    }
}
```

### Step 3: Update JavaScript API Calls

In `script.js`, update the API call functions to use real endpoints instead of simulations:

1. Find the comment `// TODO: Replace with actual API endpoint` in each API function
2. Uncomment the actual API implementation code
3. Comment out or remove the simulation code

Example for Text-to-Audio:

```javascript
async callTextToAudioAPI(options) {
    const API_ENDPOINT = MatrixConfig.api.textToAudio.endpoint;
    
    // Actual API implementation
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: MatrixConfig.api.textToAudio.headers,
            body: JSON.stringify({
                text: options.text,
                voice: options.voice,
                speed: options.speed,
                format: 'mp3'
            })
        });
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        throw new Error(`API call failed: ${error.message}`);
    }
}
```

## 🎨 Customization

### Matrix Rain Animation
Modify the animation settings in `config.js`:

```javascript
matrixRain: {
    enabled: true,
    opacity: 0.1,        // Animation opacity
    speed: 50,           // Animation speed (ms)
    fontSize: 14,        // Character size
    characters: '...'    // Characters to display
}
```

### Theme Colors
Update CSS variables in `styles.css`:

```css
:root {
    --matrix-green: #00ff41;      /* Primary green */
    --matrix-cyan: #00ffff;       /* Accent cyan */
    --matrix-black: #0d1117;      /* Dark background */
    /* ... other colors ... */
}
```

### Upload Limits
Configure file limits in `config.js`:

```javascript
upload: {
    maxFileSize: 50 * 1024 * 1024, // 50MB
    maxFiles: 10,
    allowedImageTypes: ['image/jpeg', 'image/png', ...],
    allowedPdfType: 'application/pdf'
}
```

## 🔧 Configuration Options

The `config.js` file provides extensive customization options:

- **API Endpoints**: Configure all API endpoints and keys
- **Feature Flags**: Enable/disable specific features
- **UI Text**: Customize all text and messages
- **Upload Settings**: File size limits and allowed types
- **Animation Settings**: Matrix rain customization
- **Development Mode**: Simulation and logging options

## 📱 Browser Compatibility

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🛡️ Security Features

- Client-side file validation
- File size limits
- Type checking for uploads
- Secure API key management
- No file storage on server (when using APIs)

## 🎯 Usage Examples

### Text to Audio
1. Enter your text in the textarea
2. Select voice type and speed
3. Click "GENERATE AUDIO"
4. Download the generated audio file

### Image to PDF
1. Drag & drop images or click to upload
2. Select quality and orientation
3. Click "CONVERT TO PDF"
4. Download the PDF file

### PDF Merge
1. Upload multiple PDF files
2. Arrange them in desired order
3. Set output filename
4. Click "MERGE PDFs"
5. Download the merged PDF

## 🔍 Troubleshooting

### Common Issues

**1. API calls not working**
- Check if API endpoints are correctly configured in `config.js`
- Verify API keys are valid and have sufficient credits
- Ensure CORS is properly configured for your domain

**2. Files not uploading**
- Check file size limits in configuration
- Verify file types are allowed
- Ensure JavaScript is enabled

**3. Matrix rain not showing**
- Check if canvas is supported in your browser
- Verify `matrixRain.enabled` is `true` in config
- Check browser console for errors

### Development Mode

Enable development mode for debugging:

```javascript
dev: {
    enableConsoleLogging: true,  // See detailed logs
    simulateApiCalls: true,      // Use fake API responses
}
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🎊 Acknowledgments

- Matrix theme inspired by "The Matrix" movies
- Japanese characters for authentic Matrix rain effect
- Modern CSS Grid and Flexbox for responsive design
- Professional animations and transitions

---

**Ready to enter the Matrix? 🔋**

Open `index.html` in your browser and start using the tools immediately!
