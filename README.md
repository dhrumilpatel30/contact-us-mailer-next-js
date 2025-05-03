# Contact Form Mailer API

### AI Generated :)

A secure, rate-limited API for handling contact form submissions and sending emails via Gmail.

## Features

- Email sending using Gmail SMTP
- Rate limiting to prevent abuse
- Domain restriction for CORS
- Input validation
- TypeScript support
- Easy deployment to Vercel
- Smart handling of optional fields

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file with the following variables:

   ```env
   GMAIL_USER=your-gmail@gmail.com
   GMAIL_APP_PASSWORD=your-gmail-app-password
   ALLOWED_DOMAINS=example.com,another-domain.com
   RATE_LIMIT_POINTS=5
   RATE_LIMIT_DURATION=3600
   ```

   Note: For GMAIL_APP_PASSWORD, you need to:

   1. Enable 2-factor authentication in your Google account
   2. Generate an App Password from Google Account settings
   3. Use that App Password here

## Environment Variables

- `GMAIL_USER`: Your Gmail address
- `GMAIL_APP_PASSWORD`: Your Gmail app password
- `ALLOWED_DOMAINS`: Comma-separated list of allowed domains for CORS
- `RATE_LIMIT_POINTS`: Number of requests allowed per duration (default: 5)
- `RATE_LIMIT_DURATION`: Duration in seconds for rate limiting (default: 3600 = 1 hour)

## API Usage

Send a POST request to `/api/contact` with the following body:

```json
{
  "merchantEmail": "merchant@example.com",
  "name": "John Doe",
  "email": "sender@example.com",
  "mobile": "+1234567890",
  "message": "Optional message",
  "subject": "Optional subject",
  "formSource": "Contact Page"
}
```

### Minimum Required Request:

```json
{
  "merchantEmail": "merchant@example.com"
}
```

### Example using fetch:

```javascript
const response = await fetch("https://your-domain.vercel.app/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    merchantEmail: "merchant@example.com",
  }),
});

const data = await response.json();
```

## Features

- **Smart Defaults**:

  - Name defaults to "Anonymous" if not provided
  - Email defaults to "Not Provided" if not provided
  - Mobile number defaults to "Not Provided" if not provided
  - Subject is automatically generated if not provided
  - Form source helps track which form the submission came from

- **Improved Email Template**:
  - Clean, modern design
  - Responsive layout
  - Conditional display of optional fields
  - Clear source identification
  - Omits empty/default fields from the email

## Deployment

1. Push your code to GitHub
2. Create a new project on Vercel
3. Connect your repository
4. Add the environment variables in Vercel's project settings
5. Deploy!

## Rate Limiting

The API is rate-limited to prevent abuse. By default, it allows:

- 5 requests per hour per IP address
- This can be adjusted using the environment variables

## Security

- Input validation using Zod
- CORS protection with domain allowlist
- Rate limiting per IP
- No sensitive information exposed
- Type-safe implementation
