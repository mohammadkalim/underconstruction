// Theme handling
function initializeTheme() {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
}

// Email subscription handling
async function handleSubscription(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const subscribeBtn = document.getElementById('subscribeBtn');
    const statusMsg = document.getElementById('statusMessage');

    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
    }

    try {
        subscribeBtn.disabled = true;
        // Check if Web3 features are enabled
        if (window.ethereum && document.body.dataset.web3 === 'enabled') {
            await handleWeb3Subscription(email);
        } else {
            // Traditional subscription handling
            await handleTraditionalSubscription(email);
        }
        showStatus('Successfully subscribed!', 'success');
        document.getElementById('email').value = '';
    } catch (error) {
        console.error('Subscription error:', error);
        showStatus('Failed to subscribe. Please try again later.', 'error');
    } finally {
        subscribeBtn.disabled = false;
    }
}

function showStatus(message, type) {
    const statusMsg = document.getElementById('statusMessage');
    statusMsg.textContent = message;
    statusMsg.className = `mt-2 text-sm ${type === 'error' ? 'text-red-500' : 'text-green-500'}`;
}

// Web3 specific functions
async function handleWeb3Subscription(email) {
    if (!window.ethereum) {
        throw new Error('MetaMask is not installed');
    }

    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Here you would interact with your smart contract
    // This is a placeholder for the actual contract interaction
    console.log('Web3 subscription handled:', email);
}

async function handleTraditionalSubscription(email) {
    // Simulate API call - replace with your actual API endpoint
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem('subscribed_email', email);
            resolve();
        }, 1000);
    });
}

// Initialize countdown timer
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();

    // Initialize countdown with December 31st, 2025
    const countdown = new CountdownTimer(
        '2025-12-31T00:00:00',
        {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        }
    );
    countdown.start();

    // Form submission handling
    document.getElementById('subscriptionForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const statusMsg = document.getElementById('statusMessage');
        
        if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            statusMsg.textContent = 'Please enter a valid email address.';
            statusMsg.className = 'mt-3 text-sm text-center text-red-600';
            return;
        }

        try {
            // Simulate API call - replace with your actual API endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));
            localStorage.setItem('subscribed_email', email);
            
            statusMsg.textContent = 'Thank you for subscribing!';
            statusMsg.className = 'mt-3 text-sm text-center text-green-600';
            document.getElementById('email').value = '';
        } catch (error) {
            statusMsg.textContent = 'Failed to subscribe. Please try again.';
            statusMsg.className = 'mt-3 text-sm text-center text-red-600';
        }
    });
});
