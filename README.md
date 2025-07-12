Domestika Creative AI Assitant - A lovable App

## Project info

**URL**: https://domestika-creative-assistant-launchpad.lovable.app/

**Use your preferred IDE for cloning this repo**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev

# Step 5: Configure Environment:
- Create .env with:
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
REACT_APP_DOMESTIKA_API_KEY=your_domestika_api_key (or use mock).

# Step 6: Set Up Supabase:
Start local Supabase: supabase start.
Apply migrations: supabase db push.
Seed data: supabase db seed.

# Step 7:Run the App:
Start the frontend: npm run dev.
Access at http://localhost:5173.
Ensure Docker is running for Supabase.

# Step 8: Test Features:
Configure src/utils/mock-llm.js for AI feedback and peer-matching simulations.
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/cabc4306-4198-4351-b161-30820db41197) and click on Share -> Publish.

## **Known Gaps**

- Mock LLM Limits: Feedback and peer-matching lack depth; real LLM planned for month 7.
- Scalability: Supabase may lag at 1M+ MAUs; caching pending.
- Language Support: English/Spanish only; broader support targeted for month 6.
- Mobile App: No native app yet; mobile UI in progress for month 12.
- Safety: Heuristic moderation needs manual review; enhancements underway.



## **Next Experiments**
- Advanced Feedback: Test real LLM (e.g., Claude) by month 7 for better critiques.
- Points Tuning: A/B test points (e.g., 20 vs. 30 for reviews) to boost engagement.
- Community Forum: Pilot a discussion board by month 9 for peer connections.
- Mobile Launch: Develop iOS/Android apps by month 12 with notifications.
- Localized UI: Experiment with Hindi/English for Indian users by month 6.



## **Contribute:**
Submit issues or PRs on GitHub to enhance creative learning!
