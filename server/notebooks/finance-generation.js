const fs = require("fs");

const data = [];

const digits = [10000000, 100000000, 10000000000];

const genAsset = () => {
    return Math.floor(
        Math.random() * digits[Math.floor((Math.random() * 3) % 3)]
    );
};

const genLiability = (asset) => {
    return Math.abs(asset - Math.floor(Math.random() * asset));
};

for (let i = 0; i <= 10000; i++) {
    let ass = genAsset();
    let lia = genLiability(ass);
    let rev = genLiability(Math.floor(ass / 10));
    let inc = genLiability(rev);

    let ratio = ((rev + inc) / (ass + lia)) * 100;
    let instClass = "";
    let performance = "";

    if (ratio >= 6) {
        performance = "high";
    } else if (ratio >= 4) {
        performance = "upper";
    } else if (ratio >= 2) {
        performance = "middle";
    } else {
        performance = "low";
    }

    if (ass + lia >= 10000000) {
        instClass = "high";
    } else if (ass + lia >= 5000000) {
        instClass = "upper";
    } else if (ass + lia >= 1000000) {
        instClass = "middle";
    } else {
        instClass = "low";
    }

    data.push({
        report_assets: ass,
        report_liability: lia,
        report_revenue: rev,
        report_income: inc,
        institution_class: instClass,
        ratio: ratio,
        performance: performance,
    });
}

fs.writeFile("./institution_income.json", JSON.stringify(data), () => {
    console.log("Completed");
});
