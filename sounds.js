// Sound Manager for Albert Heijn Self-Scanner
class SoundManager {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.volume = 0.3;
        this.init();
    }

    init() {
        // Initialize AudioContext on first user interaction
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });
    }

    // Create different types of click sounds
    playClickSound(type = 'default') {
        if (!this.enabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        // Different sound profiles for different actions
        switch (type) {
            case 'scan':
                // Scanner beep sound - higher pitched, longer
                oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(600, this.audioContext.currentTime + 0.1);
                gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15);
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.15);
                break;
                
            case 'success':
                // Success sound - pleasant ascending tone
                oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(660, this.audioContext.currentTime + 0.2);
                gainNode.gain.setValueAtTime(this.volume * 0.8, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.25);
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.25);
                break;
                
            case 'error':
                // Error sound - lower pitched, descending
                oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(150, this.audioContext.currentTime + 0.3);
                gainNode.gain.setValueAtTime(this.volume * 0.6, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.35);
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.35);
                break;
                
            case 'payment':
                // Payment confirmation - double beep
                this.createDoubleBeep();
                break;
                
            case 'button':
            default:
                // Standard button click - short, crisp
                oscillator.frequency.setValueAtTime(500, this.audioContext.currentTime);
                gainNode.gain.setValueAtTime(this.volume * 0.5, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.1);
                break;
        }
    }

    createDoubleBeep() {
        // First beep
        setTimeout(() => {
            const osc1 = this.audioContext.createOscillator();
            const gain1 = this.audioContext.createGain();
            osc1.connect(gain1);
            gain1.connect(this.audioContext.destination);
            osc1.frequency.setValueAtTime(700, this.audioContext.currentTime);
            gain1.gain.setValueAtTime(this.volume * 0.7, this.audioContext.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            osc1.start(this.audioContext.currentTime);
            osc1.stop(this.audioContext.currentTime + 0.1);
        }, 0);

        // Second beep
        setTimeout(() => {
            const osc2 = this.audioContext.createOscillator();
            const gain2 = this.audioContext.createGain();
            osc2.connect(gain2);
            gain2.connect(this.audioContext.destination);
            osc2.frequency.setValueAtTime(700, this.audioContext.currentTime);
            gain2.gain.setValueAtTime(this.volume * 0.7, this.audioContext.currentTime);
            gain2.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
            osc2.start(this.audioContext.currentTime);
            osc2.stop(this.audioContext.currentTime + 0.1);
        }, 150);
    }

    // Volume control
    setVolume(volume) {
        this.volume = Math.max(0, Math.min(1, volume));
    }

    // Enable/disable sounds
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }

    isEnabled() {
        return this.enabled;
    }
}

// Global sound manager instance
window.soundManager = new SoundManager();