document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
});

  

const provinsiOptions = document.getElementById("provinsi");
const kotaOptions = document.getElementById("kota");
const kecamatanOptions = document.getElementById("kecamatan");
const kelurahanOptions = document.getElementById("kelurahan");
const kodeposOptions = document.getElementById("kodepos");
const agamaOptions = document.getElementById("agama");

const agama = [
    { value: 1, text: "Islam" },
    { value: 2, text: "Kristen" },
    { value: 3, text: "Katolik" },
    { value: 4, text: "Hindu" },
    { value: 5, text: "Buddha" },
];

const urlProvinsi = "https://ibnux.github.io/data-indonesia/provinsi.json";
const urlKota = "https://ibnux.github.io/data-indonesia/kabupaten/";
const urlKecamatan = "https://ibnux.github.io/data-indonesia/kecamatan/";
const urlKelurahan = "https://ibnux.github.io/data-indonesia/kelurahan/";
const urlKodepos = "https://kodepos.vercel.app/search?q="

const fetchProvinsi = async () => {

    const response = await fetch(
        urlProvinsi
    );
    const data = await response.json();
    return data;
};

const fetchKota = async (id) => {
    const response = await fetch(
        urlKota + `${id}.json`
    );
    const data = await response.json();
    return data;
};

const fetchKecamatan = async (id) => {
    const response = await fetch(
        urlKecamatan + `${id}.json`
    );
    const data = await response.json();
    return data;
};

const fetchKelurahan = async (id) => {
    const response = await fetch(
        urlKelurahan + `${id}.json`
    );
    const data = await response.json();
    return data;
};

const fetchKodepos = async (id) => {
    const response = await fetch(
        urlKodepos + `${id}`
    );
    const data = await response.json();
    return data;
};

function handleSubmit() {
    alert("Terima kasih telah mendaftar!");
    document.getElementById("form").reset();
}

const handleProvinsi = () => {displayKota()}
const handleKota = () => {displayKecamatan()}
const handleKecamatan = () => {displayKelurahan()}
const handleKelurahan = () => {displayKodepos()}

const displayProvinsi = async () => {
    let options = await fetchProvinsi()

    let res = options.map((item) => {
        return `<option value="${item.id}">${item.nama}</option>`
    })

    provinsiOptions.innerHTML = res.join('')
    displayKota()
}

const displayKota = async () => {
    let options = await fetchKota(provinsiOptions.value)

    let res = options.map((item) => {
        return `<option value="${item.id}">${item.nama}</option>`
    })

    kotaOptions.innerHTML = res.join('')
    displayKecamatan()
}

const displayKecamatan = async () => {
    let options = await fetchKecamatan(kotaOptions.value)

    let res = options.map((item) => {
        return `<option value="${item.id}">${item.nama}</option>`
    })

    kecamatanOptions.innerHTML = res.join('')
    displayKelurahan()
}

const displayKelurahan = async () => {
    let options = await fetchKelurahan(kecamatanOptions.value.toLowerCase())

    let res = options.map((item) => {
        return `<option value="${item.id}">${item.nama}</option>`
    })

    kelurahanOptions.innerHTML = res.join('')
    displayKodepos()
}

const displayKodepos = async () => {
    let kelurahanSelected = kelurahanOptions.options[kelurahanOptions.selectedIndex].text

    const result = await fetchKodepos(kelurahanSelected)

    let filtered = result.data.filter((item) => (item.urban.includes(kelurahanSelected)))
    // console.log(filtered)
    let res = filtered.map((item) => {
        return `<option value="${item.postalcode}">${item.postalcode}</option>`        
    })

    kodeposOptions.innerHTML = res.join('')
}

const displayAgama = () => {
    let options = agama

    let res = options.map((item) => {
        return `<option value="${item.value}">${item.text}</option>`
    })

    agamaOptions.innerHTML = res.join('')
}

displayProvinsi()
displayAgama()
