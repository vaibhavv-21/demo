// Matrix Tools Hub - Configuration
// Easy API endpoint and settings management

const MatrixConfig = {
    // API Endpoints - Replace these with your actual API endpoints
    api: {
        // Text to Audio API
        textToAudio: {
            endpoint: 'YOUR_TEXT_TO_AUDIO_API_ENDPOINT',
            key: 'YOUR_TEXT_TO_AUDIO_API_KEY',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer YOUR_TEXT_TO_AUDIO_API_KEY'
            },
            // Example endpoints:
            // OpenAI: 'https://api.openai.com/v1/audio/speech'
            // ElevenLabs: 'https://api.elevenlabs.io/v1/text-to-speech'
            // Google Cloud: 'https://texttospeech.googleapis.com/v1/text:synthesize'
            // Azure: 'https://REGION.tts.speech.microsoft.com/cognitiveservices/v1'
        },

        // Image to PDF API
        imageToPdf: {
            endpoint: 'YOUR_IMAGE_TO_PDF_API_ENDPOINT',
            key: 'YOUR_IMAGE_TO_PDF_API_KEY',
            headers: {
                'Authorization': 'Bearer YOUR_IMAGE_TO_PDF_API_KEY'
            },
            // Example endpoints:
            // ConvertAPI: 'https://v2.convertapi.com/convert/jpg/to/pdf'
            // PDF.co: 'https://api.pdf.co/v1/pdf/convert/from/image'
            // CloudConvert: 'https://api.cloudconvert.com/v2/jobs'
        },

        // PDF Merge API
        pdfMerge: {
            endpoint: 'YOUR_PDF_MERGE_API_ENDPOINT',
            key: 'YOUR_PDF_MERGE_API_KEY',
            headers: {
                'Authorization': 'Bearer YOUR_PDF_MERGE_API_KEY'
            },
            // Example endpoints:
            // PDF.co: 'https://api.pdf.co/v1/pdf/merge'
            // CloudConvert: 'https://api.cloudconvert.com/v2/jobs'
            // PDFShift: 'https://api.pdfshift.io/v3/convert/pdf'
        }
    },

    // Application Settings
    settings: {
        // Matrix rain animation
        matrixRain: {
            enabled: true,
            opacity: 0.1,
            speed: 50, // milliseconds
            fontSize: 14,
            characters: 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        },

        // Notifications
        notifications: {
            duration: 5000, // milliseconds
            position: 'top-right' // top-right, top-left, bottom-right, bottom-left
        },

        // File upload limits
        upload: {
            maxFileSize: 50 * 1024 * 1024, // 50MB in bytes
            maxFiles: 10,
            allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp'],
            allowedPdfType: 'application/pdf'
        },

        // Default values
        defaults: {
            textToAudio: {
                voice: 'neural',
                speed: 1.0,
                format: 'mp3'
            },
            imageToPdf: {
                quality: 'high',
                orientation: 'portrait',
                format: 'pdf'
            },
            pdfMerge: {
                filename: 'merged-document.pdf'
            }
        }
    },

    // Feature flags
    features: {
        textToAudio: true,
        imageToPdf: true,
        pdfMerge: true,
        matrixRain: true,
        notifications: true,
        darkMode: true
    },

    // Development mode settings
    dev: {
        enableConsoleLogging: true,
        simulateApiCalls: true, // Set to false when using real APIs
        simulationDelay: {
            textToAudio: 2000,
            imageToPdf: 3000,
            pdfMerge: 2500
        }
    },

    // UI Text and Labels
    ui: {
        title: 'Matrix Tools Hub',
        tagline: 'Enter the Matrix of Productivity',
        sections: {
            textToAudio: {
                title: 'TEXT TO AUDIO',
                description: 'Convert text to speech with AI',
                buttonText: 'GENERATE AUDIO'
            },
            imageToPdf: {
                title: 'IMAGE TO PDF',
                description: 'Transform images to PDF format',
                buttonText: 'CONVERT TO PDF'
            },
            pdfMerge: {
                title: 'PDF MERGE',
                description: 'Combine multiple PDFs into one',
                buttonText: 'MERGE PDFs'
            }
        },
        messages: {
            success: {
                audioGenerated: 'Audio generated successfully!',
                pdfCreated: 'PDF created successfully!',
                pdfsMerged: 'PDFs merged successfully!'
            },
            errors: {
                noText: 'Please enter some text to convert',
                noImages: 'Please select images to convert',
                notEnoughPdfs: 'Please select at least 2 PDF files to merge',
                fileTooLarge: 'File is too large. Maximum size is 50MB.',
                invalidFileType: 'Invalid file type. Please select supported files.',
                apiError: 'API call failed. Please try again.',
                networkError: 'Network error. Please check your connection.'
            }
        }
    }
};

// Validation functions
MatrixConfig.validate = {
    // Validate API configuration
    apiConfig() {
        const apis = ['textToAudio', 'imageToPdf', 'pdfMerge'];
        const missing = [];
        
        apis.forEach(api => {
            if (!MatrixConfig.api[api].endpoint || MatrixConfig.api[api].endpoint.includes('YOUR_')) {
                missing.push(api);
            }
        });
        
        if (missing.length > 0) {
            console.warn('⚠️ Missing API configuration for:', missing.join(', '));
            console.log('Please update config.js with your actual API endpoints and keys.');
        }
        
        return missing.length === 0;
    },

    // Validate file size
    fileSize(file) {
        return file.size <= MatrixConfig.settings.upload.maxFileSize;
    },

    // Validate image file type
    imageType(file) {
        return MatrixConfig.settings.upload.allowedImageTypes.includes(file.type);
    },

    // Validate PDF file type
    pdfType(file) {
        return file.type === MatrixConfig.settings.upload.allowedPdfType;
    }
};

// Utility functions
MatrixConfig.utils = {
    // Get formatted file size
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    },

    // Get maximum file size as string
    getMaxFileSize() {
        return this.formatFileSize(MatrixConfig.settings.upload.maxFileSize);
    },

    // Log configuration status
    logStatus() {
        if (MatrixConfig.dev.enableConsoleLogging) {
            console.log('🔧 Matrix Tools Hub Configuration:');
            console.log('- Simulation Mode:', MatrixConfig.dev.simulateApiCalls);
            console.log('- Features Enabled:', Object.keys(MatrixConfig.features).filter(f => MatrixConfig.features[f]));
            console.log('- Max File Size:', this.getMaxFileSize());
            console.log('- API Validation:', MatrixConfig.validate.apiConfig() ? '✅ Valid' : '❌ Missing');
        }
    }
};

// Initialize configuration
document.addEventListener('DOMContentLoaded', () => {
    MatrixConfig.utils.logStatus();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MatrixConfig;
}

// Make globally available
window.MatrixConfig = MatrixConfig;