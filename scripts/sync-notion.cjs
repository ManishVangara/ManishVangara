const fs = require('fs');
const path = require('path');
const { NotionAPI } = require('notion-client');

const notion = new NotionAPI();

async function syncNotion() {
    console.log('🔄 Syncing Notion pages...');

    // 1. Read the projects file to find Notion IDs
    const projectsPath = path.join(__dirname, '../src/data/projects.js');
    let projectsContent;
    try {
        projectsContent = fs.readFileSync(projectsPath, 'utf-8');
    } catch (err) {
        console.error(`❌ Could not read projects file at ${projectsPath}`);
        process.exit(1);
    }

    // Simple regex to find notionId: "..."
    // This avoids needing to handle ESM imports in this script
    const idRegex = /notionId:\s*["']([^"']+)["']/g;
    let match;
    const pageIds = new Set();

    while ((match = idRegex.exec(projectsContent)) !== null) {
        pageIds.add(match[1]);
    }

    if (pageIds.size === 0) {
        console.warn('⚠️ No Notion IDs found in src/data/projects.js');
        return;
    }

    console.log(`Found ${pageIds.size} unique Notion IDs to sync.`);

    const notionData = {};

    for (const pageId of pageIds) {
        try {
            console.log(`   Fetching page: ${pageId}...`);
            const recordMap = await notion.getPage(pageId);
            notionData[pageId] = recordMap;
        } catch (err) {
            console.error(`❌ Error fetching page ${pageId}:`, err.message);
        }
    }

    // 2. Write to cache file
    const outputPath = path.join(__dirname, '../src/data/notion-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(notionData, null, 2));

    console.log(`✅ Synced ${Object.keys(notionData).length} pages to ${outputPath}`);
}

syncNotion();
