# Setup Instructions

## Email Configuration

This app uses FormSubmit, which is **completely free** and requires **no signup**!

### Step 1: Update Your Email Address

1. Open `src/App.jsx`
2. Find the line: `const YOUR_EMAIL = 'YOUR_EMAIL@example.com'`
3. Replace `YOUR_EMAIL@example.com` with your actual email address

That's it! No signup, no API keys, no configuration needed.

### How It Works

FormSubmit will send emails directly to your inbox. The first time someone submits the form, FormSubmit will send you a confirmation email - just click the link to verify, and then all future submissions will go straight to your inbox.

### Optional: Customize Email Subject

If you want to change the email subject line, edit the `_subject` field in the `handleSubmit` function in `src/App.jsx`.

## Running the App

1. Install dependencies (if you haven't already):
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to the URL shown in the terminal (usually http://localhost:5173)

Enjoy your Valentine's Day invite! 💕
