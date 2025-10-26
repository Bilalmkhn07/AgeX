# Deployment Guide for Rejuvenation.AI

## Quick Deploy to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Build the project:
```bash
npm run build
```

3. Deploy:
```bash
vercel
```

4. Follow the prompts and you'll get a live URL!

### Option 2: Using Vercel Dashboard

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com)

3. Click "Add New Project"

4. Import your GitHub repository

5. Vercel will auto-detect Vite and use these settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

6. (Optional) Add environment variable:
   - Key: `VITE_ANTHROPIC_API_KEY`
   - Value: Your Anthropic API key

7. Click "Deploy"

## Environment Variables

To enable the Claude AI chat feature, add your Anthropic API key:

### Local Development
1. Copy `.env.example` to `.env`
2. Add your API key:
```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

### Production (Vercel)
1. Go to Project Settings > Environment Variables
2. Add: `VITE_ANTHROPIC_API_KEY` with your key
3. Redeploy

## Testing Before Deploy

1. Build locally:
```bash
npm run build
```

2. Preview the build:
```bash
npm run preview
```

3. Open the URL shown (usually http://localhost:4173)

## Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" > "Domains"
3. Add your custom domain
4. Follow DNS instructions

## Performance Tips

The app is optimized for production but consider:
- Using a CDN for static assets
- Enabling Vercel's Edge Network (automatic)
- Monitoring with Vercel Analytics

## Post-Deployment

Your app will be live at: `https://your-project.vercel.app`

Share this link with judges and test all features:
- ✅ Landing page loads with animations
- ✅ Form submission works
- ✅ Dashboard displays all sections
- ✅ Charts render correctly
- ✅ Chat interface works (if API key set)
- ✅ Mobile responsive design

## Troubleshooting

**Build fails on Vercel:**
- Check that all dependencies are in `package.json`
- Ensure Node version is compatible (18.x or higher)

**Charts not showing:**
- Recharts requires proper window object - works in production

**Chat not working:**
- Verify `VITE_ANTHROPIC_API_KEY` is set in environment variables
- Check API key is valid and has credits

## Cost Considerations

- Vercel: Free tier supports this perfectly
- Anthropic API: Pay per token (optional feature)
- Bandwidth: Vercel free tier includes 100GB/month

Enjoy your deployment! 🚀

