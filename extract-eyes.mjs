import fs from 'fs';

const content = fs.readFileSync('C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\c3d651cb-6575-40c4-a11b-932f3787c899\\.system_generated\\steps\\107\\content.md', 'utf-8');

const regex = /EyeClosed.*?<path d="([^"]+)"/g;
let match;
while ((match = regex.exec(content)) !== null) {
    console.log(match[1]);
}
