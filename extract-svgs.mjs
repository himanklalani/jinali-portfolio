import fs from 'fs';

const content = fs.readFileSync('C:\\Users\\Administrator\\.gemini\\antigravity\\brain\\c3d651cb-6575-40c4-a11b-932f3787c899\\.system_generated\\steps\\107\\content.md', 'utf-8');

const regex = /(YNNYAqMfb-hover|YNNYAqMfb|Y6gTRixSV-hover|Y6gTRixSV|ghztEw7hd-hover|ghztEw7hd|KLpIWDUHH-hover|KLpIWDUHH):\s*\{svg:\s*'([^']+)'/g;
let match;
const svgs = {};

const map = {
    'KLpIWDUHH': 'Boy 1',
    'Y6gTRixSV': 'Boy 2',
    'ghztEw7hd': 'Girl 1',
    'YNNYAqMfb': 'Girl 2'
};

while ((match = regex.exec(content)) !== null) {
    let key = match[1];
    let isHover = false;
    if (key.endsWith('-hover')) {
        isHover = true;
        key = key.replace('-hover', '');
    }
    const name = map[key] + (isHover ? ' Hover' : '');
    const svg = match[2];
    svgs[name] = svg;
}

fs.writeFileSync('scratch-svgs.json', JSON.stringify(svgs, null, 2));
console.log(Object.keys(svgs));
