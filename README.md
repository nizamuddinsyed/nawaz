<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1GTxThXy1nSj-Sb5O5cpfFRpPMlHfE5CF

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`

Note: This project previously used an external Gemini API for the AI assistant. The assistant now answers strictly from the embedded resume (see `services/geminiService.ts`). No external API keys are required. To update the resume content used by the assistant, edit the CV text inside `services/geminiService.ts` or refactor it into a separate JSON file if preferred.
