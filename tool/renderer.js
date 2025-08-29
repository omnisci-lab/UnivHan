const charInput = document.getElementById("charInput");
const ucodeInput = document.getElementById("ucodeInput");
const radicalInput = document.getElementById("radicalInput");
const strokesInput = document.getElementById("strokesInput");
const sinoVietnameseInput = document.getElementById("sinoVietnameseInput");
const onyomiReadingInput = document.getElementById("onyomiReadingInput");
const hanjaReadingInput = document.getElementById("hanjaReadingInput");
const exampleInput = document.getElementById("exampleInput");
const btnSave = document.getElementById("btnSave");
const searchInput = document.getElementById("searchInput");
const entriesDiv = document.getElementById("entries");

btnSave.addEventListener("click", async () => {
    const entry = {
        char: charInput.value.trim(),
        ucode: ucodeInput.value.trim(),
        radicals: radicalInput.value.split(",").map(x => x.trim()),
        strokes: Number(strokesInput.value),
        readings: {
            sinoVietnamese: sinoVietnameseInput.value.split(",").map(x => x.trim()),
            onyomiReadings: onyomiReadingInput.value.split(",").map(x => x.trim()),
            hanjaReadings: hanjaReadingInput.value.split(",").map(x => x.trim()).filter(Boolean)
        },
        examples: exampleInput.value.split("\n").map(x => x.trim()).filter(Boolean)
    };

    window.api.saveEntry(entry);
});

searchInput.addEventListener("input", async () => {
    const keyword = searchInput.value.trim();
    window.api.search(keyword);
});