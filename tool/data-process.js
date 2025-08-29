const fs = require("fs");
const path = require("path");
const TOML = require("@iarna/toml");

module.exports = { saveOrUpdateEntry, searchEntries };

function loadFile(file) {
    if (!fs.existsSync(file)) 
        return { entry: [] };

    const data = TOML.parse(fs.readFileSync(file, "utf-8"));

    if (!Array.isArray(data.entry))
        data.entry = [];

    return data;
}

function saveFile(file, data) {
    fs.writeFileSync(file, TOML.stringify(data));
}

function listTomlFiles(dataDir) {
    return fs.readdirSync(dataDir)
        .filter(f => f.endsWith(".toml"))
        .sort((a, b) => parseInt(a.split(".")[0]) - parseInt(b.split(".")[0]));
}

function saveOrUpdateEntry(dataDir, entryObj) {
    let files = listTomlFiles(dataDir);

    if (files.length === 0)
        files.push("001.toml");

    // 1. Kiểm tra entry đã tồn tại chưa
    let foundFile = null;
    let foundData = null;
    for (const f of files) {
        const filePath = path.join(dataDir, f);
        const data = loadFile(filePath);
        if (data.entry.some(e => e.ucode === entryObj.ucode)) {
            foundFile = filePath;
            foundData = data;
            break;
        }
    }

    if (foundFile) {
        // Cập nhật entry
        const idx = foundData.entry.findIndex(e => e.ucode === entryObj.ucode);
        const existing = foundData.entry[idx];
        for (const key of Object.keys(entryObj)) {
            if (entryObj[key] != null) {
                if (Array.isArray(entryObj[key])) {
                    existing[key] = Array.from(new Set([...(existing[key] || []), ...entryObj[key]]));
                } else {
                    existing[key] = entryObj[key];
                }
            }
        }
        foundData.entry[idx] = existing;
        saveFile(foundFile, foundData);
        return;
    }

    // 2. Chưa tồn tại → thêm vào file cuối cùng hoặc tạo file mới
    let lastFile = files[files.length - 1];
    let lastFilePath = path.join(dataDir, lastFile);
    let data = loadFile(lastFilePath);

    if (data.entry.length >= 100) {
        const nextIndex = files.length + 1;
        const nextFileName = String(nextIndex).padStart(3, "0") + ".toml";
        lastFilePath = path.join(dataDir, nextFileName);
        data = { entry: [] };
    }

    data.entry.push(entryObj);
    saveFile(lastFilePath, data);
}

function searchEntries(dataDir, char) {
    const files = listTomlFiles(dataDir);
    const results = [];

    for (const file of files) {
        const filePath = path.join(dataDir, file);
        const data = loadFile(filePath);
        const matches = data.entry.filter(e => e.char === char);

        console.log(matches);
        results.push(...matches);
    }

    return results;
}