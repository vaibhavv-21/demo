// Matrix Tools Hub - JavaScript
// Professional Matrix-themed tool interface with API integration placeholders

class MatrixToolsHub {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.initMatrixRain();
    }

    init() {
        console.log('🔋 Matrix Tools Hub initialized');
        this.setupSmoothScrolling();
        this.updateSpeedValue();
    }

    // Matrix Rain Animation
    initMatrixRain() {
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Matrix characters
        const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const fontSize = 14;
        const columns = canvas.width / fontSize;

        // Drops array
        const drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        // Draw function
        const draw = () => {
            // Semi-transparent background for trail effect
            ctx.fillStyle = 'rgba(1, 4, 9, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff41';
            ctx.font = `${fontSize}px 'Fira Code', monospace`;

            // Draw characters
            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        // Animation loop
        const animate = () => {
            draw();
            setTimeout(animate, 50);
        };

        animate();
    }

    setupSmoothScrolling() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupEventListeners() {
        // Speed range slider
        const speedRange = document.getElementById('speed-range');
        if (speedRange) {
            speedRange.addEventListener('input', this.updateSpeedValue);
        }

        // Text to Audio
        this.setupTextToAudio();
        
        // Image to PDF
        this.setupImageToPdf();
        
        // PDF Merge
        this.setupPdfMerge();
    }

    updateSpeedValue() {
        const speedRange = document.getElementById('speed-range');
        const speedValue = document.getElementById('speed-value');
        if (speedRange && speedValue) {
            speedValue.textContent = `${speedRange.value}x`;
        }
    }

    // Text to Audio Setup
    setupTextToAudio() {
        const generateBtn = document.getElementById('generate-audio-btn');
        const textInput = document.getElementById('text-input');
        const voiceSelect = document.getElementById('voice-select');
        const speedRange = document.getElementById('speed-range');

        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                const text = textInput.value.trim();
                if (!text) {
                    this.showNotification('Please enter some text to convert', 'error');
                    return;
                }

                const options = {
                    text: text,
                    voice: voiceSelect.value,
                    speed: parseFloat(speedRange.value)
                };

                this.generateAudio(options);
            });
        }
    }

    async generateAudio(options) {
        const resultArea = document.getElementById('audio-result');
        const loadingDiv = document.getElementById('audio-loading');
        const outputDiv = document.getElementById('audio-output');

        // Show loading
        resultArea.classList.remove('hidden');
        loadingDiv.classList.remove('hidden');
        outputDiv.classList.add('hidden');

        try {
            // API Call Placeholder
            console.log('🎵 Text-to-Audio API Call:', options);
            
            // Simulate API call
            const response = await this.callTextToAudioAPI(options);
            
            if (response.success) {
                // Hide loading, show result
                loadingDiv.classList.add('hidden');
                outputDiv.classList.remove('hidden');
                
                // Set audio source
                const audioElement = outputDiv.querySelector('audio');
                audioElement.src = response.audioUrl;
                
                // Setup download
                const downloadBtn = outputDiv.querySelector('.download-btn');
                downloadBtn.onclick = () => this.downloadFile(response.audioUrl, 'generated-audio.mp3');
                
                this.showNotification('Audio generated successfully!', 'success');
            } else {
                throw new Error(response.error || 'Failed to generate audio');
            }
        } catch (error) {
            console.error('Audio generation error:', error);
            loadingDiv.classList.add('hidden');
            this.showNotification(`Error: ${error.message}`, 'error');
        }
    }

    // API Call Placeholder for Text to Audio
    async callTextToAudioAPI(options) {
        // TODO: Replace with actual API endpoint
        const API_ENDPOINT = 'YOUR_TEXT_TO_AUDIO_API_ENDPOINT';
        
        // Simulated API call - replace with actual implementation
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate successful response
                resolve({
                    success: true,
                    audioUrl: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBDWF1/LMeSsFJYHK8d2NSAAVZbbq66hYFApGmd7yv24jBDOAy/HTgxsGGWu+8+SEMwQeADOCzfLEfyyELHfL8N2QQQsUXrPo6qlaFgoFmN7zwXgmADOGyrDELnKGOHnJuyQFJHfH8N2QQAoUXrLq66hVFAvb2/rtm2ojAzZ+z/HgiiAHE2y+8+SEMwQeADOCzfLEfyyELHfL8N2QQQsUXrPo6qlaFgoFmN7zwXgmADAM...', // Sample base64 audio data
                    message: 'Audio generated successfully'
                });
            }, 2000);
        });

        // Actual API implementation would look like:
        /*
        try {
            const response = await fetch(API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY'
                },
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
        */
    }

    // Image to PDF Setup
    setupImageToPdf() {
        const uploadArea = document.getElementById('image-upload-area');
        const fileInput = document.getElementById('image-input');
        const convertBtn = document.getElementById('convert-pdf-btn');
        const previewArea = document.getElementById('image-preview');

        let selectedFiles = [];

        // File input change
        fileInput.addEventListener('change', (e) => {
            this.handleImageFiles(Array.from(e.target.files));
        });

        // Drag and drop
        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files).filter(file => 
                file.type.startsWith('image/')
            );
            this.handleImageFiles(files);
        });

        // Convert button
        convertBtn.addEventListener('click', () => {
            if (selectedFiles.length === 0) {
                this.showNotification('Please select images to convert', 'error');
                return;
            }

            const options = {
                files: selectedFiles,
                quality: document.getElementById('pdf-quality').value,
                orientation: document.getElementById('pdf-orientation').value
            };

            this.convertImagesToPdf(options);
        });

        // Handle file selection
        this.handleImageFiles = (files) => {
            selectedFiles = files;
            this.displayImagePreviews(files);
            convertBtn.disabled = files.length === 0;
        };
    }

    displayImagePreviews(files) {
        const previewArea = document.getElementById('image-preview');
        previewArea.innerHTML = '';
        
        if (files.length > 0) {
            previewArea.classList.remove('hidden');
            
            files.forEach((file, index) => {
                const previewItem = document.createElement('div');
                previewItem.className = 'preview-item';
                
                const fileInfo = document.createElement('div');
                fileInfo.className = 'file-info';
                
                const fileName = document.createElement('span');
                fileName.className = 'file-name';
                fileName.textContent = file.name;
                
                const fileSize = document.createElement('span');
                fileSize.className = 'file-size';
                fileSize.textContent = this.formatFileSize(file.size);
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.textContent = 'Remove';
                removeBtn.onclick = () => this.removeFile(index);
                
                fileInfo.appendChild(fileName);
                fileInfo.appendChild(fileSize);
                previewItem.appendChild(fileInfo);
                previewItem.appendChild(removeBtn);
                previewArea.appendChild(previewItem);
            });
        } else {
            previewArea.classList.add('hidden');
        }
    }

    async convertImagesToPdf(options) {
        const resultArea = document.getElementById('pdf-result');
        const loadingDiv = document.getElementById('pdf-loading');
        const outputDiv = document.getElementById('pdf-output');

        resultArea.classList.remove('hidden');
        loadingDiv.classList.remove('hidden');
        outputDiv.classList.add('hidden');

        try {
            console.log('📄 Image-to-PDF API Call:', options);
            
            const response = await this.callImageToPdfAPI(options);
            
            if (response.success) {
                loadingDiv.classList.add('hidden');
                outputDiv.classList.remove('hidden');
                
                const downloadBtn = outputDiv.querySelector('.download-btn');
                downloadBtn.onclick = () => this.downloadFile(response.pdfUrl, 'converted-images.pdf');
                
                this.showNotification('PDF created successfully!', 'success');
            } else {
                throw new Error(response.error || 'Failed to convert images');
            }
        } catch (error) {
            console.error('PDF conversion error:', error);
            loadingDiv.classList.add('hidden');
            this.showNotification(`Error: ${error.message}`, 'error');
        }
    }

    // API Call Placeholder for Image to PDF
    async callImageToPdfAPI(options) {
        // TODO: Replace with actual API endpoint
        const API_ENDPOINT = 'YOUR_IMAGE_TO_PDF_API_ENDPOINT';
        
        // Simulated API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    pdfUrl: 'blob:' + URL.createObjectURL(new Blob(['%PDF-1.4 simulated pdf'], {type: 'application/pdf'})),
                    message: 'PDF created successfully'
                });
            }, 3000);
        });

        // Actual implementation:
        /*
        const formData = new FormData();
        options.files.forEach((file, index) => {
            formData.append(`image_${index}`, file);
        });
        formData.append('quality', options.quality);
        formData.append('orientation', options.orientation);

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();
        */
    }

    // PDF Merge Setup
    setupPdfMerge() {
        const uploadArea = document.getElementById('pdf-upload-area');
        const fileInput = document.getElementById('pdf-input');
        const mergeBtn = document.getElementById('merge-pdf-btn');
        const pdfList = document.getElementById('pdf-list');

        let selectedPdfs = [];

        fileInput.addEventListener('change', (e) => {
            this.handlePdfFiles(Array.from(e.target.files));
        });

        uploadArea.addEventListener('click', () => fileInput.click());
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });
        uploadArea.addEventListener('dragleave', () => {
            uploadArea.classList.remove('dragover');
        });
        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            const files = Array.from(e.dataTransfer.files).filter(file => 
                file.type === 'application/pdf'
            );
            this.handlePdfFiles(files);
        });

        mergeBtn.addEventListener('click', () => {
            if (selectedPdfs.length < 2) {
                this.showNotification('Please select at least 2 PDF files to merge', 'error');
                return;
            }

            const options = {
                files: selectedPdfs,
                filename: document.getElementById('merge-filename').value || 'merged-document.pdf'
            };

            this.mergePdfs(options);
        });

        this.handlePdfFiles = (files) => {
            selectedPdfs = files;
            this.displayPdfList(files);
            mergeBtn.disabled = files.length < 2;
        };
    }

    displayPdfList(files) {
        const pdfList = document.getElementById('pdf-list');
        pdfList.innerHTML = '';
        
        if (files.length > 0) {
            pdfList.classList.remove('hidden');
            
            files.forEach((file, index) => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                
                const fileInfo = document.createElement('div');
                fileInfo.className = 'file-info';
                
                const fileName = document.createElement('span');
                fileName.className = 'file-name';
                fileName.textContent = file.name;
                
                const fileSize = document.createElement('span');
                fileSize.className = 'file-size';
                fileSize.textContent = this.formatFileSize(file.size);
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'remove-btn';
                removeBtn.textContent = 'Remove';
                removeBtn.onclick = () => this.removePdfFile(index);
                
                fileInfo.appendChild(fileName);
                fileInfo.appendChild(fileSize);
                fileItem.appendChild(fileInfo);
                fileItem.appendChild(removeBtn);
                pdfList.appendChild(fileItem);
            });
        } else {
            pdfList.classList.add('hidden');
        }
    }

    async mergePdfs(options) {
        const resultArea = document.getElementById('merge-result');
        const loadingDiv = document.getElementById('merge-loading');
        const outputDiv = document.getElementById('merge-output');

        resultArea.classList.remove('hidden');
        loadingDiv.classList.remove('hidden');
        outputDiv.classList.add('hidden');

        try {
            console.log('🔗 PDF Merge API Call:', options);
            
            const response = await this.callPdfMergeAPI(options);
            
            if (response.success) {
                loadingDiv.classList.add('hidden');
                outputDiv.classList.remove('hidden');
                
                const downloadBtn = outputDiv.querySelector('.download-btn');
                downloadBtn.onclick = () => this.downloadFile(response.pdfUrl, options.filename);
                
                this.showNotification('PDFs merged successfully!', 'success');
            } else {
                throw new Error(response.error || 'Failed to merge PDFs');
            }
        } catch (error) {
            console.error('PDF merge error:', error);
            loadingDiv.classList.add('hidden');
            this.showNotification(`Error: ${error.message}`, 'error');
        }
    }

    // API Call Placeholder for PDF Merge
    async callPdfMergeAPI(options) {
        // TODO: Replace with actual API endpoint
        const API_ENDPOINT = 'YOUR_PDF_MERGE_API_ENDPOINT';
        
        // Simulated API call
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    pdfUrl: 'blob:' + URL.createObjectURL(new Blob(['%PDF-1.4 merged pdf'], {type: 'application/pdf'})),
                    message: 'PDFs merged successfully'
                });
            }, 2500);
        });

        // Actual implementation:
        /*
        const formData = new FormData();
        options.files.forEach((file, index) => {
            formData.append(`pdf_${index}`, file);
        });
        formData.append('filename', options.filename);

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer YOUR_API_KEY'
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();
        */
    }

    // Utility Functions
    removeFile(index) {
        const fileInput = document.getElementById('image-input');
        const convertBtn = document.getElementById('convert-pdf-btn');
        
        // Create new FileList without the removed file
        const dt = new DataTransfer();
        const files = Array.from(fileInput.files);
        files.forEach((file, i) => {
            if (i !== index) dt.items.add(file);
        });
        
        fileInput.files = dt.files;
        this.handleImageFiles(Array.from(dt.files));
    }

    removePdfFile(index) {
        const fileInput = document.getElementById('pdf-input');
        const mergeBtn = document.getElementById('merge-pdf-btn');
        
        const dt = new DataTransfer();
        const files = Array.from(fileInput.files);
        files.forEach((file, i) => {
            if (i !== index) dt.items.add(file);
        });
        
        fileInput.files = dt.files;
        this.handlePdfFiles(Array.from(dt.files));
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    downloadFile(url, filename) {
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add styles for notification
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 6px;
                color: white;
                font-family: var(--font-code);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 1rem;
                max-width: 400px;
                animation: slideIn 0.3s ease;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            }
            .notification-success { background: #00ff41; color: #000; }
            .notification-error { background: #ff0040; }
            .notification-info { background: #00ffff; color: #000; }
            .notification button {
                background: none;
                border: none;
                color: inherit;
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        
        if (!document.querySelector('#notification-styles')) {
            style.id = 'notification-styles';
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MatrixToolsHub();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MatrixToolsHub;
}