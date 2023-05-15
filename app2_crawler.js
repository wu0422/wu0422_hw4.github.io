async function scrapePrices() {
    const response = await fetch('https://m.coa.gov.tw/FarmProduceOriginPrice/Index');
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const rows = doc.querySelectorAll('tbody tr:not(.LCGD_Template)');

    const prices = [];
    rows.forEach((row) => {
        const crop = row.querySelector('td:nth-child(1)').textContent.trim();
        const year = row.querySelector('td:nth-child(2)').textContent.trim();
        const priceCells = row.querySelectorAll('td:nth-child(n+3)');
        const priceValues = Array.from(priceCells).map((cell) => cell.textContent.trim());

        prices.push({ crop, year, prices: priceValues });
    });

    return prices;
}

// 调用爬虫函数
scrapePrices().then((prices) => {
    console.log(prices);
}).catch((error) => {
    console.error('Error:', error);
});

