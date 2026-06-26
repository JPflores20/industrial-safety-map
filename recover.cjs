const fs = require('fs');

const transcriptPath = 'C:\\Users\\pepej\\.gemini\\antigravity\\brain\\9f97f7ac-57be-4e20-a4fe-17e881a52891\\.system_generated\\logs\\transcript_full.jsonl';

const lines = fs.readFileSync(transcriptPath, 'utf-8').split('\n');

for (const line of lines) {
  if (!line.trim()) continue;
  try {
    const step = JSON.parse(line);
    if (step.tool_calls) {
      for (const call of step.tool_calls) {
        if (call.name === 'multi_replace_file_content') {
            console.log("Found replace on:", call.args.TargetFile);
        }
      }
    }
  } catch (e) {
    // ignore parse errors
  }
}
