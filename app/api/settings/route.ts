import { NextRequest, NextResponse } from 'next/server';

// Pour l'instant, nous utilisons des settings par défaut
// Dans une vraie application, vous voudriez stocker cela en base de données
const defaultSettings = {
  enableAutoUpdate: false,
  releaseChannel: 'stable',
  enableTelemetry: true,
  selectedLanguageModel: 'gpt-4',
  openaiApiKey: '',
  anthropicApiKey: '',
  googleApiKey: '',
  azureApiKey: '',
  azureEndpoint: '',
  customApiUrl: '',
  customApiKey: '',
  supabaseAccessToken: '',
  supabaseProjectId: '',
  neonApiKey: '',
  vercelAccessToken: '',
  vercelTeamId: '',
  githubAccessToken: '',
};

export async function GET() {
  try {
    // Dans une vraie application, récupérer depuis la base de données
    return NextResponse.json(defaultSettings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Dans une vraie application, sauvegarder en base de données
    const updatedSettings = { ...defaultSettings, ...body };
    
    return NextResponse.json(updatedSettings);
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}
