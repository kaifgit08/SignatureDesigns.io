// Custom Cursor (only for desktop)
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
            const cursor = document.getElementById('cursor');
            const cursorFollower = document.getElementById('cursorFollower');

            document.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                
                setTimeout(() => {
                    cursorFollower.style.left = e.clientX + 'px';
                    cursorFollower.style.top = e.clientY + 'px';
                }, 100);
            });
        }

        // Background Animation
        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('bg-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            document.getElementById('bgAnimation').appendChild(particle);

            setTimeout(() => {
                particle.remove();
            }, 20000);
        }

        // Create particles periodically
        setInterval(createParticle, 500);

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            }
        });

        // AI Agent Drag Functionality
        let isDragging = false;
        let dragOffset = { x: 0, y: 0 };
        const aiAgent = document.getElementById('aiAgent');

        // Mouse events
        aiAgent.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragOffset.x = e.clientX - aiAgent.offsetLeft;
            dragOffset.y = e.clientY - aiAgent.offsetTop;
            aiAgent.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const x = e.clientX - dragOffset.x;
                const y = e.clientY - dragOffset.y;
                
                const maxX = window.innerWidth - aiAgent.offsetWidth;
                const maxY = window.innerHeight - aiAgent.offsetHeight;
                
                aiAgent.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
                aiAgent.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
                aiAgent.style.right = 'auto';
                aiAgent.style.bottom = 'auto';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            aiAgent.style.cursor = 'grab';
        });

        // Touch events for mobile
        aiAgent.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isDragging = true;
            const touch = e.touches[0];
            const rect = aiAgent.getBoundingClientRect();
            dragOffset.x = touch.clientX - rect.left;
            dragOffset.y = touch.clientY - rect.top;
        });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                e.preventDefault();
                const touch = e.touches[0];
                const x = touch.clientX - dragOffset.x;
                const y = touch.clientY - dragOffset.y;
                
                const maxX = window.innerWidth - aiAgent.offsetWidth;
                const maxY = window.innerHeight - aiAgent.offsetHeight;
                
                aiAgent.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
                aiAgent.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
                aiAgent.style.right = 'auto';
                aiAgent.style.bottom = 'auto';
            }
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // AI Agent Chat Bot Functionality

        // Create chat window
        function createChatWindow() {
            if (document.getElementById('aiChatWindow')) return; // Prevent multiple windows

            const chatWindow = document.createElement('div');
            chatWindow.id = 'aiChatWindow';
            chatWindow.style.position = 'fixed';
            chatWindow.style.bottom = '100px';
            chatWindow.style.right = '40px';
            chatWindow.style.width = '320px';
            chatWindow.style.maxWidth = '90vw';
            chatWindow.style.background = '#222';
            chatWindow.style.color = '#fff';
            chatWindow.style.borderRadius = '12px';
            chatWindow.style.boxShadow = '0 4px 24px rgba(0,0,0,0.2)';
            chatWindow.style.zIndex = '9999';
            chatWindow.style.display = 'flex';
            chatWindow.style.flexDirection = 'column';
            chatWindow.style.overflow = 'hidden';

            // Header with close button
            const header = document.createElement('div');
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.alignItems = 'center';
            header.style.background = '#181818';
            header.style.padding = '10px 16px';
            header.style.fontWeight = 'bold';

            header.textContent = "AI Design Assistant";

            const closeBtn = document.createElement('button');
            closeBtn.textContent = '×';
            closeBtn.style.background = 'none';
            closeBtn.style.border = 'none';
            closeBtn.style.color = '#fff';
            closeBtn.style.fontSize = '20px';
            closeBtn.style.cursor = 'pointer';
            closeBtn.style.marginLeft = '12px';
            closeBtn.setAttribute('aria-label', 'Close chat');
            closeBtn.addEventListener('click', closeChatWindow);

            header.appendChild(closeBtn);

            // Chat messages area
            const messages = document.createElement('div');
            messages.id = 'aiChatMessages';
            messages.style.flex = '1';
            messages.style.padding = '12px';
            messages.style.overflowY = 'auto';
            messages.style.maxHeight = '260px';

            // Input area
            const inputArea = document.createElement('form');
            inputArea.style.display = 'flex';
            inputArea.style.borderTop = '1px solid #333';

            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Type your message...';
            input.style.flex = '1';
            input.style.padding = '10px';
            input.style.border = 'none';
            input.style.outline = 'none';
            input.style.background = '#292929';
            input.style.color = '#fff';

            const sendBtn = document.createElement('button');
            sendBtn.type = 'submit';
            sendBtn.textContent = 'Send';
            sendBtn.style.background = '#4f8cff';
            sendBtn.style.color = '#fff';
            sendBtn.style.border = 'none';
            sendBtn.style.padding = '0 18px';
            sendBtn.style.cursor = 'pointer';

            inputArea.appendChild(input);
            inputArea.appendChild(sendBtn);

            chatWindow.appendChild(header);
            chatWindow.appendChild(messages);
            chatWindow.appendChild(inputArea);

            document.body.appendChild(chatWindow);

            // Initial AI greeting
            addChatMessage('ai', "Hello! I'm your AI design assistant. How can I help you with your design needs today?");

            // Handle sending messages
            inputArea.addEventListener('submit', function(e) {
                e.preventDefault();
                const userMsg = input.value.trim();
                if (userMsg) {
                    addChatMessage('user', userMsg);
                    setTimeout(() => {
                        addChatMessage('ai', getAIReply(userMsg));
                    }, 600);
                    input.value = '';
                }
            });

            // Close chat when clicking outside
            setTimeout(() => {
                document.addEventListener('mousedown', outsideClickListener);
                document.addEventListener('touchstart', outsideClickListener);
            }, 0);
        }

        function closeChatWindow() {
            const chatWindow = document.getElementById('aiChatWindow');
            if (chatWindow) {
                chatWindow.remove();
                document.removeEventListener('mousedown', outsideClickListener);
                document.removeEventListener('touchstart', outsideClickListener);
            }
        }

        function outsideClickListener(e) {
            const chatWindow = document.getElementById('aiChatWindow');
            if (chatWindow && !chatWindow.contains(e.target) && e.target !== aiAgent) {
                closeChatWindow();
            }
        }

        function addChatMessage(sender, text) {
            const messages = document.getElementById('aiChatMessages');
            if (!messages) return;
            const msg = document.createElement('div');
            msg.style.margin = '8px 0';
            msg.style.display = 'flex';
            msg.style.justifyContent = sender === 'user' ? 'flex-end' : 'flex-start';

            const bubble = document.createElement('div');
            bubble.textContent = text;
            bubble.style.padding = '8px 14px';
            bubble.style.borderRadius = '18px';
            bubble.style.maxWidth = '80%';
            bubble.style.background = sender === 'user' ? '#4f8cff' : '#333';
            bubble.style.color = '#fff';
            bubble.style.fontSize = '15px';
            bubble.style.wordBreak = 'break-word';

            msg.appendChild(bubble);
            messages.appendChild(msg);
            messages.scrollTop = messages.scrollHeight;
        }

        // Simple AI reply logic (can be replaced with real AI)
        function getAIReply(userMsg) {
            const msg = userMsg.toLowerCase();
            if (msg.includes('logo')) return "I can help you design a logo! What style or colors do you prefer?";
            if (msg.includes('website')) return "Sure! Tell me more about your website project.";
            if (msg.includes('thank')) return "You're welcome! Let me know if you need anything else.";
            if (msg.includes('hi') || msg.includes('hello')) return "Hello! How can I assist you with your design?";
            return "That's interesting! Could you please provide more details about your design needs?";
        }

        // Open chat on AI agent click
        aiAgent.addEventListener('click', (e) => {
            if (!isDragging) {
                createChatWindow();
            }
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form Submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We\'ll get back to you soon.');
            this.reset();
        });

        // Portfolio items interaction
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('click', function() {
                alert('Click here to upload your work! This is where you can showcase your amazing designs.');
            });
        });

        // Service cards animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe service cards and portfolio items
        document.querySelectorAll('.service-card, .portfolio-item').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });