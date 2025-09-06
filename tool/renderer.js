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
const editorModalEl = document.getElementById('editorModal');

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

function loadCharacterList(searchText) {
    const listEl = document.getElementById('character-list');
    const getListPromise = window.api.loadList(searchText);

    getListPromise.then((res) => {
        console.log(res);
        listEl.innerHTML = '';
        res.forEach(item => {
            let trEl = document.createElement('tr');

            let tdEl1 = document.createElement('td');
            tdEl1.innerText = item.char;

            let tdEl2 = document.createElement('td');
            tdEl2.innerText = item.ucode;

            let tdEl3 = document.createElement('td');

            let aEl1 = document.createElement('a');
            aEl1.href='#';
            aEl1.innerText = 'Edit';
            aEl1.classList = 'btn btn-sm btn-success';
            aEl1.setAttribute('data-id', item.char);
            aEl1.addEventListener('click', function(e) {
                const character = aEl1.getAttribute('data-id');
                const editorModal = new bootstrap.Modal(editorModalEl);
                editorModal.show();
            });

            let aEl2 = document.createElement('a');
            aEl2.href='#';
            aEl2.innerText = 'Delete';
            aEl2.classList = 'btn btn-sm btn-danger mx-1'
            aEl2.setAttribute('data-id', item.char);
            aEl2.addEventListener('click', function(e){
                const character = aEl1.getAttribute('data-id');
            });

            tdEl3.appendChild(aEl1);
            tdEl3.appendChild(aEl2);

            trEl.appendChild(tdEl1);
            trEl.appendChild(tdEl2);
            trEl.appendChild(tdEl3);

            listEl.appendChild(trEl);
        });
    }).catch();
}

document.addEventListener('DOMContentLoaded', () => {
    loadCharacterList(searchInput.value);
});


searchInput.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter')
        return;

    loadCharacterList(searchInput.value);
});