# DavAri Solutions Website Starter

This is a simple static website starter for DavAri Solutions that is ready to deploy on Vercel.

## Files
- `index.html` — homepage
- `styles.css` — site styling

## Beginner path to deploy on Vercel
1. Create a GitHub account if you do not already have one.
2. Create a new GitHub repository named `davari-solutions-site`.
3. Upload `index.html` and `styles.css` to that repository.
4. Create a Vercel account and sign in with GitHub.
5. In Vercel, click **Add New...** → **Project**.
6. Import the `davari-solutions-site` repository.
7. On the project setup screen:
   - Framework Preset: `Other`
   - Build Command: leave blank
   - Output Directory: leave blank
8. Click **Deploy**.
9. Once the project is live, go to **Settings** → **Domains**.
10. Add:
   - `davarisolutions.com`
   - `www.davarisolutions.com`
11. Copy the DNS values Vercel shows you.
12. Log into Network Solutions and update the DNS records for `@` and `www`.
13. Wait for verification and propagation.

## Notes
- Do not delete existing email-related DNS records unless you mean to change email service.
- This is a first version. Replace placeholder text and add your final logo later.
