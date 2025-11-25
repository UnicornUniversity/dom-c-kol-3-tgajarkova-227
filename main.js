function main(dtoIn) {
  // Data
  const maleNames = [
    "Jan","Petr","Pavel","Jiří","Karel","Lukáš","Tomáš","Martin","Ondřej","Jaroslav",
    "Miroslav","Josef","František","Václav","Daniel","Roman","Radek","Jakub","Adam","Štěpán",
    "Libor","Zdeněk","Aleš","Milan","David","Filip","Vojtěch","Marek","Patrik","Dominik",
    "Bohuslav","Leon","Hynek","Robert","Michal","Richard","Ladislav","Alois","Otakar","Artur",
    "Erik","Alexandr","Břetislav","Rostislav","Vratislav","Oldřich","Čeněk","Vilém","Bruno","Albert"
  ];

  const femaleNames = [
    "Eva","Anna","Marie","Tereza","Lucie","Petra","Jana","Martina","Veronika","Kateřina",
    "Hana","Lenka","Barbora","Monika","Klára","Kristýna","Alena","Adéla","Nikola","Gabriela",
    "Karolína","Zuzana","Markéta","Šárka","Ilona","Vlasta","Božena","Tatiana","Ela","Linda",
    "Dominika","Sabina","Renata","Sára","Lea","Eliška","Viktorie","Magda","Nela","Laura",
    "Andrea","Diana","Iveta","Jitka","Jiřina","Zdeňka","Michaela","Silvie","Soňa","Stela"
  ];

  const surnames = [
    "Novák","Svoboda","Novotný","Dvořák","Černý","Procházka","Kučera","Veselý","Horák","Němec",
    "Marek","Pokorný","Hájek","Král","Růžička","Beneš","Fiala","Sedláček","Doležal","Zeman",
    "Kolář","Vávra","Kříž","Bláha","Kopecký","Malý","Urban","Jelínek","Sýkora",
    "Polák","Ptáček","Bartoš","Vlček","Mach","Kadlec","Šimek","Hrabě","Pospíšil","Štěpánek",
    "Klein","Ševčík","Neuman","Pavlík","Holub","Křížek","Říha","Navrátil","Mark"
  ];

  const workloads = [10, 20, 30, 40];

  // Pomocné funkce

  function randomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function generateBirthdate(minAge, maxAge) {
    const now = new Date();
    const minDate = new Date(now.getFullYear() - maxAge, now.getMonth(), now.getDate());
    const maxDate = new Date(now.getFullYear() - minAge, now.getMonth(), now.getDate());
    const timestamp = minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime());
    return new Date(timestamp).toISOString(); // ISO formát
  }

  // Správné české přechylování 
  function femaleSurname(surname) {
    // 1) končí na -ek → -ková (Hájek → Hájková, Ptáček → Ptáčková)
    if (surname.endsWith("ek")) {
      return surname.slice(0, -2) + "ková";
    }

    // 2) končí na -ec → -cová (Samec → Samcová)
    if (surname.endsWith("ec")) {
      return surname.slice(0, -2) + "cová";
    }

    // 3) končí na -e → -ová (Šime → Šimová)
    if (surname.endsWith("e")) {
      return surname.slice(0, -1) + "ová";
    }

    // 4) končí na -ý → -á (Černý → Černá)
    if (surname.endsWith("ý")) {
      return surname.slice(0, -1) + "á";
    }

    // 5) končí na -a → +ová (Svoboda → Svobodová)
    if (surname.endsWith("a")) {
      return surname + "ová";
    }

    // 6) výchozí — +ová (Novák → Nováková, Holub → Holubová)
    return surname + "ová";
  }

  //Generování zaměstnanů

  const employees = [];

  for (let i = 0; i < dtoIn.count; i++) {
    const gender = Math.random() < 0.5 ? "male" : "female";

    const name = gender === "male" ? randomItem(maleNames) : randomItem(femaleNames);
    let surname = randomItem(surnames);

    if (gender === "female") {
      surname = femaleSurname(surname);
    }

    const birthdate = generateBirthdate(dtoIn.age.min, dtoIn.age.max);
    const workload = randomItem(workloads);

    employees.push({
      gender,
      birthdate,
      name,
      surname,
      workload
    });
  }

  return employees;
}

//Příkaz pro vybrání 5 zaměstnanců
const dtoIn = {
  count: 5,
  age: { min: 19, max: 35 }
};

console.log(main(dtoIn));
