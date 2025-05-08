
// OpenAI integration for processing user responses

export type DichotomyCutAnalysis = {
  controllable: string[];
  uncontrollable: string[];
  recommendation: string;
}

export const analyzeConcerns = async (
  concerns: string[], 
  apiKey: string
): Promise<DichotomyCutAnalysis> => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a Stoic wisdom assistant helping with a mental clarity exercise called "The Dichotomy Cut". Analyze user concerns and categorize them into "controllable" and "uncontrollable" aspects based on Stoic philosophy. Then recommend one specific action for a controllable concern.'
          },
          {
            role: 'user',
            content: `Here are three concerns I'm dealing with: ${concerns.join(", ")}. Please categorize them into "controllable" and "uncontrollable" aspects, and suggest one specific action I can take for something within my control.`
          }
        ],
        temperature: 0.7,
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    // Parse the AI response to extract categorized concerns
    // This is a simple parsing strategy that can be improved
    const controllable: string[] = [];
    const uncontrollable: string[] = [];
    let recommendation = "";
    
    // Simple parsing of the AI response to extract categories
    if (aiResponse.includes("Controllable") || aiResponse.includes("In Your Control")) {
      const lines = aiResponse.split('\n');
      let currentCategory = "";
      
      for (const line of lines) {
        const trimmedLine = line.trim();
        
        if (trimmedLine.includes("Controllable") || trimmedLine.includes("In Your Control")) {
          currentCategory = "controllable";
          continue;
        } else if (trimmedLine.includes("Uncontrollable") || trimmedLine.includes("Not In Your Control")) {
          currentCategory = "uncontrollable";
          continue;
        } else if (trimmedLine.includes("Recommendation") || trimmedLine.includes("Action") || trimmedLine.includes("Suggest")) {
          currentCategory = "recommendation";
          continue;
        }
        
        // Skip empty lines or headers
        if (!trimmedLine || trimmedLine.startsWith('#') || trimmedLine.startsWith('*')) continue;
        
        if (currentCategory === "controllable" && trimmedLine.length > 0) {
          // Remove bullet points and numbering
          const cleanedLine = trimmedLine.replace(/^[\d\-\*\.\)]+\s*/, '');
          controllable.push(cleanedLine);
        } else if (currentCategory === "uncontrollable" && trimmedLine.length > 0) {
          const cleanedLine = trimmedLine.replace(/^[\d\-\*\.\)]+\s*/, '');
          uncontrollable.push(cleanedLine);
        } else if (currentCategory === "recommendation" && trimmedLine.length > 0) {
          recommendation += trimmedLine + " ";
        }
      }
    }
    
    return {
      controllable,
      uncontrollable,
      recommendation: recommendation.trim()
    };
  } catch (error) {
    console.error("Error analyzing concerns:", error);
    return {
      controllable: [],
      uncontrollable: [],
      recommendation: "Unable to analyze concerns. Please try again later."
    };
  }
};
