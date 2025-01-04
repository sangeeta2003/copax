const stockLogos = {
    AAPL: "https://companieslogo.com/img/orig/AAPL-bf1a4314.png",
    GOOGL: "https://companieslogo.com/img/orig/GOOGL-0ed88f7c.png",
    MSFT: "https://companieslogo.com/img/orig/MSFT-a203b22d.png",
    AMZN: "https://companieslogo.com/img/orig/AMZN-e9f942e4.png",
    META: "https://companieslogo.com/img/orig/META-4767da84.png",
    TSLA: "https://companieslogo.com/img/orig/TSLA-6da1e510.png",
    // Add more stock logos as needed
};

export const getStockLogo = (ticker) => {
    return stockLogos[ticker.toUpperCase()] || "https://via.placeholder.com/50?text=" + ticker;
}; 