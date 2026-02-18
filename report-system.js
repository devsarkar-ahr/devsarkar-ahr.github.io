/**
 * Duckmath Game Report System
 * Add this to any game page with minimal code
 * 
 * All you need in your HTML:
 * <script src="report-system.js" data-game-id="game-slug" data-game-title="Game Name"></script>
 */

(function() {
    // Get game info from script tag attributes
    const scriptTag = document.currentScript || document.scripts[document.scripts.length - 1];
    const gameId = scriptTag.getAttribute('data-game-id') || 'unknown-game';
    const gameTitle = scriptTag.getAttribute('data-game-title') || 'Unknown Game';
    const formspreeId = scriptTag.getAttribute('data-formspree-id') || 'xeelelze';

    // Inject CSS
    const style = document.createElement('style');
    style.innerHTML = `
        #gameFrameWrapper.fullscreen {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99999;
            background: #000;
            border: none;
        }

        .n290 {
            transition: all 0.3s ease;
            position: relative;
        }

        .n290:hover {
            transform: scale(1.1);
        }

        .n290.active {
            color: #0004ff;
            transform: scale(1.15);
            animation: pulse 0.5s ease;
        }

        .n290.active span {
            font-weight: bold;
        }

        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1.15); }
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .n300 {
            display: none;
            position: fixed;
            z-index: 10000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
        }

        .n300.show {
            display: flex;
            justify-content: center;
            align-items: center;
            animation: fadeIn 0.3s ease;
        }

        .n302 {
            background-color: white;
            padding: 40px;
            border-radius: 15px;
            width: 90%;
            max-width: 600px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.4s ease;
            max-height: 90vh;
            overflow-y: auto;
        }

        .n304 {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #333;
            border-bottom: 3px solid #ff6b6b;
            padding-bottom: 15px;
        }

        .n299 {
            margin-bottom: 20px;
        }

        .n299 label {
            display: block;
            margin-bottom: 10px;
            font-weight: 600;
            color: #555;
            font-size: 15px;
        }

        .n299 input,
        .n299 select,
        .n299 textarea {
            width: 100%;
            padding: 12px;
            border: 2px solid #ddd;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
        }

        .n299 input:focus,
        .n299 select:focus,
        .n299 textarea:focus {
            outline: none;
            border-color: #ff6b6b;
            box-shadow: 0 0 8px rgba(255, 107, 107, 0.3);
        }

        .n299 textarea {
            resize: vertical;
            min-height: 120px;
        }

        .n303 {
            display: flex;
            gap: 15px;
            justify-content: flex-end;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #eee;
        }

        .n429 {
            padding: 12px 25px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 15px;
            font-weight: 600;
            transition: all 0.3s ease;
        }

        .n430 {
            background-color: #ff6b6b;
            color: white;
        }

        .n430:hover {
            background-color: #ff5252;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
        }

        .n431 {
            background-color: #e0e0e0;
            color: #333;
        }

        .n431:hover {
            background-color: #d0d0d0;
        }

        .n375 {
            display: none;
            color: #28a745;
            font-weight: bold;
            text-align: center;
            padding: 20px;
            background-color: #d4edda;
            border-radius: 8px;
            margin-bottom: 20px;
            border: 2px solid #28a745;
            animation: slideUp 0.4s ease;
        }

        .n375.show {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Inject HTML Modal
    const modalHTML = `
        <div id="reportModal" class="n300">
            <div class="n302">
                <div class="n375" id="successMessage">
                    ✓ Report submitted successfully! Thank you for your feedback.
                </div>
                <form id="reportForm" style="display: block;">
                    <div class="n304">Report Game Issue</div>
                    
                    <div class="n299">
                        <label for="reportEmail">Your Email:</label>
                        <input type="email" id="reportEmail" placeholder="your.email@example.com" required>
                    </div>

                    <div class="n299">
                        <label for="reportCategory">Issue Category:</label>
                        <select id="reportCategory" required>
                            <option value="">-- Select Category --</option>
                            <option value="not-loading">Game Not Loading</option>
                            <option value="crash">Game Crashes/Freezes</option>
                            <option value="performance">Performance Issues (Lag/Slow)</option>
                            <option value="audio">Audio/Sound Problems</option>
                            <option value="controls">Control Issues</option>
                            <option value="graphics">Graphics Glitches</option>
                            <option value="gameplay">Gameplay Issues</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div class="n299">
                        <label for="reportBrowser">Browser:</label>
                        <input type="text" id="reportBrowser" placeholder="e.g., Chrome, Firefox, Safari" required>
                    </div>

                    <div class="n299">
                        <label for="reportDescription">Detailed Description:</label>
                        <textarea id="reportDescription" placeholder="Please describe the issue in detail. What were you doing when the problem occurred?" required></textarea>
                    </div>

                    <div class="n303">
                        <button type="button" class="n429 n431" onclick="window.reportSystem.closeModal()">Cancel</button>
                        <button type="button" class="n429 n430" onclick="window.reportSystem.submitReport()">Submit Report</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Report System Functions
    window.reportSystem = {
        gameId: gameId,
        gameTitle: gameTitle,
        formspreeId: formspreeId,

        openModal: function() {
            const modal = document.getElementById('reportModal');
            const form = document.getElementById('reportForm');
            const successMsg = document.getElementById('successMessage');
            
            modal.classList.add('n338');
            form.style.display = 'block';
            successMsg.classList.remove('n338');
            document.body.style.overflow = 'hidden';
        },

        closeModal: function() {
            const modal = document.getElementById('reportModal');
            modal.classList.remove('n338');
            document.body.style.overflow = 'auto';
            document.getElementById('reportForm').reset();
        },

        submitReport: function() {
            const category = document.getElementById('reportCategory').value;
            const description = document.getElementById('reportDescription').value;
            const email = document.getElementById('reportEmail').value;
            const browser = document.getElementById('reportBrowser').value;

            if (!email || !category || !description || !browser) {
                alert('Please fill in all required fields.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            const reportData = {
                gameTitle: this.gameTitle,
                gamePage: window.location.href,
                category: category,
                description: description,
                email: email,
                browser: browser,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                _subject: `Game Report ${this.gameTitle} - ${category}`
            };

            const FORMSPREE_URL = `https://formspree.io/f/${this.formspreeId}`;

            fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reportData)
            })
            .then(response => {
                if (response.ok) {
                    window.reportSystem.showSuccess();
                } else {
                    throw new Error('Submission failed');
                }
            })
            .catch(error => {
                let reports = JSON.parse(localStorage.getItem('gameReports') || '[]');
                reports.push(reportData);
                localStorage.setItem('gameReports', JSON.stringify(reports));
                console.log('Report stored locally:', reportData);
                window.reportSystem.showSuccess();
            });
        },

        showSuccess: function() {
            const form = document.getElementById('reportForm');
            const successMsg = document.getElementById('successMessage');
            
            form.style.display = 'none';
            successMsg.classList.add('n338');
            
            setTimeout(() => {
                window.reportSystem.closeModal();
            }, 2500);
        }
    };

    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Find report button and attach listener
        const reportBtn = document.getElementById('reportBtn');
        if (reportBtn) {
            reportBtn.addEventListener('click', function(e) {
                e.preventDefault();
                window.reportSystem.openModal();
            });
        }

        // Close modal on background click
        const reportModal = document.getElementById('reportModal');
        if (reportModal) {
            reportModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    window.reportSystem.closeModal();
                }
            });
        }

        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                window.reportSystem.closeModal();
            }
        });
    });
})();
